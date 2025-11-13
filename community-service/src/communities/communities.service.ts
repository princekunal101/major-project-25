import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CommunityTopics, CommunityTypes, SharedValue } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommunityDto } from './dtos/create-community.dto';
import { MemberRequestDto } from './dtos/member-request.dto';
import { UpdateCommunityDto } from './dtos/update-community.dto';

@Injectable()
export class CommunitiesService {
  constructor(
    @Inject('AUTH_SERVICE') private client: ClientProxy,
    private prisma: PrismaService,
  ) {}

  // TODO: Get All Communitites
  async getAllCommunitiesCursor(
    cursor?: string,
    pageSize: number = 5,
    communityName?: string,
    types?: CommunityTypes,
    topic?: CommunityTopics,
    value?: SharedValue,
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
      },
    });
  }

  // Create community method
  async createCommunity(community: CreateCommunityDto) {
    const {
      userId,
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
  async updateCommunity(id: string, community: UpdateCommunityDto) {
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
    // TODO: check user are applicable for changes or not
    const adminUser = await this.prisma.community.findUnique({
      where: { id: communityId, admins: { some: { userId: id } } },
    });

    // TODO: check user is group admin or not
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

  // Memeber Requests method
  async memberRequest(id: string, targetId: MemberRequestDto) {
    // find community with is community is private or not
    const userExist = await this.prisma.communityUser.findUnique({
      where: { userId: id },
    });

    // check for the communities
    const community = await this.prisma.community.findUnique({
      where: { id: targetId.targetCommunityId },
    });

    if (!community) {
      throw new UnauthorizedException('Wrong credentials');
    }

    if (!userExist) {
      await this.verifyAndSave(id);
    }

    // fetch community users
    const user = await this.prisma.communityUser.findUnique({
      where: { userId: id, isAllowed: true },
    });
    if (!user) {
      throw new InternalServerErrorException();
    }

    // if user already community member
    const member = await this.prisma.communityMember.findUnique({
      where: {
        userId_communityId: {
          userId: id,
          communityId: targetId.targetCommunityId,
        },
        status: 'ACCEPTED',
      },
    });

    if (member) {
      throw new UnauthorizedException('Wrong credentials');
    }
    // if private then set pending, not allowed
    await this.prisma.communityMember.upsert({
      where: {
        userId_communityId: {
          userId: id,
          communityId: targetId.targetCommunityId,
        },
      },
      update: {
        status: community.communityType == 'PUBLIC' ? 'ACCEPTED' : 'PENDING',
      },
      create: {
        userId: user.userId,
        communityId: targetId.targetCommunityId,
        status: community.communityType == 'PUBLIC' ? 'ACCEPTED' : 'PENDING',
      },
    });
  }

  // Deatach memeber rquest method
  async detachRequest(id: string, targetId: MemberRequestDto) {
    // update as rejected
    try {
      await this.prisma.communityMember.update({
        where: {
          userId_communityId: {
            userId: id,
            communityId: targetId.targetCommunityId,
          },
          status: 'ACCEPTED',
        },
        data: {
          status: 'REJECTED',
        },
      });
    } catch (e) {
      throw new UnauthorizedException('Wrong credentials');
    }
  }

  // community users entry with TCP
  async verifyAndSave(userId: string) {
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
