import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CommunityTopics, CommunityTypes, SharedValue } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommunityDto } from './dtos/create-community.dto';
import { MemberRequestDto } from './dtos/member-request.dto';
import { UpdateCommunityDto } from './dtos/update-community.dto';
import { CommunityAdminDto } from './dtos/create-community-admin.dto';
import { CommunityMemberRequestDto } from './dtos/community-member-request.dto';

@Injectable()
export class CommunitiesService {
  constructor(
    @Inject('AUTH_SERVICE') private client: ClientProxy,
    private prisma: PrismaService,
  ) {}

  // Get All Communitites
  async getAllCommunitiesCursor(
    cursor?: string,
    pageSize: number = 5,
    communityName?: string,
    types?: CommunityTypes,
    topic?: CommunityTopics,
    value?: SharedValue,
    userId?: string,
  ) {
    return this.prisma.community.findMany({
      take: pageSize,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { id: 'asc' },
      where: {
        communityName: { contains: communityName, mode: 'insensitive' },
        communityType: types,
        communityTopic: topic,
        sharedValue: value,
        createdBy: userId,
      },
    });
  }

  // Create community method
  async createCommunity(userId: string, community: CreateCommunityDto) {
    const {
      displayName,
      communityName,
      description,
      guideline,
      communityTopic,
      communityType,
      sharedValue,
    } = community;

    // first check user has allowed or not
    const communityUsers = await this.prisma.communityUser.findUnique({
      where: { userId: userId },
    });
    // if user not found then send request to auth get user
    if (!communityUsers) {
      await this.verifyAndSave(userId);
    }

    // Verify IsAllowed or not
    const user = await this.prisma.communityUser.findUnique({
      where: { userId: userId, isAllowed: true },
    });
    // if not found then throw error
    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }

    // create community
    const existCommunity = await this.prisma.community.findUnique({
      where: { communityName: communityName },
    });
    if (existCommunity) {
      throw new BadRequestException('Community Name already exist');
    }

    try {
      const community = await this.prisma.community.create({
        data: {
          displayName: displayName,
          communityName: communityName,
          description: description,
          guideline: guideline,
          communityType: communityType,
          communityTopic: communityTopic,
          sharedValue: sharedValue,
          createdBy: userId,
          admins: { connect: { userId: userId } },
        },
      });

      await this.prisma.communityMember.create({
        data: {
          userId: userId,
          communityId: community.id,
          status: 'ACCEPTED',
        },
      });
    } catch (error) {
      if (error === 'P2002') {
        throw new BadRequestException('Duplicate entry not allowed');
      }
      throw new InternalServerErrorException('Not created');
    }
  }

  // Update Community method
  async updateCommunity(userId: string, community: UpdateCommunityDto) {
    const {
      communityId,
      displayName,
      communityName,
      description,
      guideline,
      keywords,
      communityType,
      communityTopic,
      sharedValue,
    } = community;

    // check user are applicable for changes or not
    const adminUser = await this.prisma.community.findUnique({
      where: { id: communityId, admins: { some: { userId: userId } } },
    });

    // check user is group admin or not
    if (!adminUser) {
      throw new BadRequestException();
    }

    if (communityName != null) {
      const exitcommunityName = await this.prisma.community.findUnique({
        where: { communityName: communityName },
      });
      if (exitcommunityName) {
        throw new BadRequestException('Community Name already exist');
      }
    }

    // Perform changes
    await this.prisma.community.update({
      where: { id: adminUser.id },
      data: {
        displayName: displayName,
        communityName: communityName,
        description: description,
        guideline: guideline,
        keywords: keywords,
        communityType: communityType,
        communityTopic: communityTopic,
        sharedValue: sharedValue,
      },
    });
  }

  // Create Community Admin method
  async makeCommunityAdmin(userId: string, community: CommunityAdminDto) {
    // TODO: check userId as group admin
    this.checkAndVerifyAsCommunityAdmin(userId, community.targetCommunityId);

    // TODO: also check target user is community member
    const communityMember = await this.prisma.communityMember.findUnique({
      where: {
        userId_communityId: {
          userId: community.targetUserId,
          communityId: community.targetCommunityId,
        },
      },
    });
    // TODO: if error ocurs then show exceptions
    if (!communityMember) {
      throw new UnauthorizedException('Wrong credentials');
    }

    // TODO: check already admin or not
    const alreadyAdmin = await this.prisma.community.findUnique({
      where: {
        id: community.targetCommunityId,
        admins: { some: { userId: community.targetUserId } },
      },
    });

    if (alreadyAdmin) {
      throw new ConflictException('Already request accepted!');
    }
    // TODO: if user as admin then make admin to target userId
    await this.prisma.community.update({
      where: {
        id: community.targetCommunityId,
        admins: { some: { userId: userId } },
      },
      data: {
        admins: { connect: { userId: community.targetUserId } },
      },
    });
  }

  // Remove Community from Admin method
  async removeFromCommunityAdmin(userId: string, community: CommunityAdminDto) {
    // TODO: check userId as group admin
    this.checkAndVerifyAsCommunityAdmin(userId, community.targetCommunityId);

    // TODO: also check target user is community admin or not
    // this.checkAndVerifyAsCommunityAdmin(
    //   community.targetUserId,
    //   community.targetCommunityId,
    // );

    // TODO: check already removed from admin or not
    const adminRemoved = await this.prisma.community.findUnique({
      where: {
        id: community.targetCommunityId,
        admins: { some: { userId: community.targetUserId } },
      },
    });

    if (!adminRemoved) {
      throw new ConflictException('Already request accepted!');
    }
    // TODO: if user as admin then remove from admin
    await this.prisma.community.update({
      where: { id: community.targetCommunityId },
      data: {
        admins: { disconnect: { userId: community.targetUserId } },
      },
    });
  }

  // Accepting the Community Memmber Request Method
  async acceptingCommunitMemberRequests(
    userId: string,
    memberRequest: CommunityMemberRequestDto,
  ) {
    // TODO: check community is private and group admin or not
    const community = await this.prisma.community.findUnique({
      where: {
        id: memberRequest.targetCommunityId,
        communityType: 'PRIVATE',
        admins: { some: { userId: userId } },
      },
    });
    // TODO: if community is not private then show wrong request
    if (!community) {
      throw new UnauthorizedException('Wrong credentials');
    }

    // TODO: check user is already accepted or not
    const aceeptedUser = await this.prisma.communityMember.findUnique({
      where: {
        userId_communityId: {
          userId: memberRequest.targetUserId,
          communityId: memberRequest.targetCommunityId,
        },
        status: 'ACCEPTED',
      },
    });

    if (aceeptedUser) {
      throw new ConflictException('Already accepted!');
    }

    // TODO: if not then accepting the request
    try {
      await this.prisma.communityMember.update({
        where: {
          userId_communityId: {
            userId: memberRequest.targetUserId,
            communityId: memberRequest.targetCommunityId,
          },
          status: 'PENDING',
        },
        data: {
          status: 'ACCEPTED',
        },
      });
    } catch (e) {
      throw new NotFoundException('User not requested!');
    }
  }

  // Removing the community member method
  async removingCommunityMembers(
    userId: string,
    memberRequest: CommunityMemberRequestDto,
  ) {
    // TODO: check and verify userId as group admin or not
    this.checkAndVerifyAsCommunityAdmin(
      userId,
      memberRequest.targetCommunityId,
    );

    // TODO: check for already rejected or not
    const alreadyRemoved = await this.prisma.communityMember.findUnique({
      where: {
        userId_communityId: {
          userId: memberRequest.targetUserId,
          communityId: memberRequest.targetCommunityId,
        },
        status: 'REJECTED',
      },
    });

    if (alreadyRemoved) {
      throw new ConflictException('Already request accepted!');
    }

    // TODO: check removed from admin or not
    const adminRemoved = await this.prisma.community.findUnique({
      where: {
        id: memberRequest.targetCommunityId,
        admins: { some: { userId: memberRequest.targetUserId } },
      },
    });

    if (adminRemoved) {
      // TODO: if user as admin then remove from admin
      await this.prisma.community.update({
        where: { id: memberRequest.targetCommunityId },
        data: {
          admins: { disconnect: { userId: memberRequest.targetUserId } },
        },
      });
    }

    // TODO: removing from community member
    await this.prisma.communityMember.update({
      where: {
        userId_communityId: {
          userId: memberRequest.targetUserId,
          communityId: memberRequest.targetCommunityId,
        },
      },
      data: {
        status: 'REJECTED',
      },
    });
  }

  // Memeber Requests method
  async memberRequest(userId: string, targetId: MemberRequestDto) {
    // find community with is community is private or not
    const userExist = await this.prisma.communityUser.findUnique({
      where: { userId: userId },
    });

    // check for the communities
    const community = await this.prisma.community.findUnique({
      where: { id: targetId.targetCommunityId },
    });

    if (!community) {
      throw new UnauthorizedException('Wrong credentials');
    }

    if (!userExist) {
      await this.verifyAndSave(userId);
    }

    // fetch community users
    const user = await this.prisma.communityUser.findUnique({
      where: { userId: userId, isAllowed: true },
    });
    if (!user) {
      throw new InternalServerErrorException();
    }

    // if user already community member
    const member = await this.prisma.communityMember.findUnique({
      where: {
        userId_communityId: {
          userId: userId,
          communityId: targetId.targetCommunityId,
        },
        OR: [{ status: 'ACCEPTED' }, { status: 'PENDING' }],
      },
    });

    if (member) {
      throw new ConflictException('Already Request sent or Accepted!');
    }
    // if private then set pending, not allowed
    await this.prisma.communityMember.upsert({
      where: {
        userId_communityId: {
          userId: userId,
          communityId: targetId.targetCommunityId,
        },
      },
      update: {
        status: community.communityType != 'PRIVATE' ? 'ACCEPTED' : 'PENDING',
      },
      create: {
        userId: user.userId,
        communityId: targetId.targetCommunityId,
        status: community.communityType != 'PRIVATE' ? 'ACCEPTED' : 'PENDING',
      },
    });
  }

  // Deatach memeber request method
  async detachRequest(userId: string, targetId: MemberRequestDto) {
    const userExist = await this.prisma.communityMember.findUnique({
      where: {
        userId_communityId: {
          userId: userId,
          communityId: targetId.targetCommunityId,
        },
        status: 'REJECTED',
      },
    });

    if (userExist) {
      throw new ConflictException('User Already Disconnected!');
    }
    // update as rejected
    try {
      await this.prisma.communityMember.update({
        where: {
          userId_communityId: {
            userId: userId,
            communityId: targetId.targetCommunityId,
          },
          OR: [{ status: 'ACCEPTED' }, { status: 'PENDING' }],
        },
        data: {
          status: 'REJECTED',
        },
      });
    } catch (e) {
      throw new UnauthorizedException('Wrong credentials');
    }
  }

  // TODO: check and verify userId as group admin or not
  private async checkAndVerifyAsCommunityAdmin(
    userId: string,
    targetCommunityId: string,
  ) {
    // check user are applicable for changes or not
    const adminUser = await this.prisma.community.findUnique({
      where: { id: targetCommunityId, admins: { some: { userId: userId } } },
    });

    // check user is group admin or not
    if (!adminUser) {
      throw new BadRequestException('you are not authorized!');
    }
  }

  // community users entry with TCP
  private async verifyAndSave(userId: string) {
    // call to auth-service and res back
    const res = await this.client
      .send<{
        isValid: boolean;
      }>({ cmd: 'verify-for-community-user' }, { userId: userId })
      .toPromise();

    if (!res?.isValid) {
      throw new UnauthorizedException('Wrong credentials');
    }
    await this.prisma.communityUser.upsert({
      where: { userId: userId },
      update: {},
      create: {
        userId: userId,
        isAllowed: true,
      },
    });
  }
}
