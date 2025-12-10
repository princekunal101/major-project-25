import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileFullNameDto } from './dtos/profie-fullname.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { ProfileUsernameDto } from './dtos/profile-username.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CheckAvailableUsernameDto } from './dtos/check-available-username.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @Inject('AUTH_SERVICE') private client: ClientProxy,

    private readonly prisma: PrismaService,
  ) {}

  // TODO: Creating inserting user's name NOT unique username
  // Upsert to handle both create and update scenarios
  async setFullName(createProfile: ProfileFullNameDto) {
    // TODO: check user already exists
    const existUser = await this.prisma.userProfile.findUnique({
      where: { userId: createProfile.userId },
    });

    // TODO: if user not exists
    if ((await this.verifyWithTCP(createProfile.userId)) || existUser) {
      // TODO: created for the created user profile
      await this.prisma.userProfile.upsert({
        where: { userId: createProfile.userId },
        update: { name: createProfile.fullName },
        create: {
          userId: createProfile.userId,
          name: createProfile.fullName,
        },
      });
    }
  }

  // TODO: set the unique username, while loggedout
  async updateUsername(profileUsername: ProfileUsernameDto) {
    const { userId, username } = profileUsername;

    // TODO: if user not exists
    const user = await this.prisma.userProfile.findUnique({
      where: { userId: userId },
      select: { userId: true },
    });

    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }

    // TODO: check given username exist or not
    const existUserName = await this.prisma.userProfile.findUnique({
      where: {
        username: username,
      },
      select: { name: true },
    });

    // TODO: if exist then return sugessions of username
    if (existUserName) {
      const usernames = await this.genrateUniuqeUsernames(existUserName.name);

      throw new ConflictException({
        message: `Username ${username} are in use`,
        usernames,
      });
    }

    // TODO: make changes
    await this.prisma.userProfile.update({
      where: { userId: userId },
      data: { username: username },
    });

    return { message: 'username succesfully set', username };
  }

  // Get all profiles
  // async findAllProfiles() {
  //   return this.prisma.userProfile.findMany();
  // }

  // Get profile by userId
  // async findOneProfileByUserId(userId: string) {
  //   return this.prisma.userProfile.findUnique({
  //     where: { userId: userId },
  //   });
  // }

  // TODO: check the username available
  async checkUserName(userId: any, deatils: CheckAvailableUsernameDto) {
    const { username } = deatils;

    // TODO: check username already exist or not
    const existUserName = await this.prisma.userProfile.findUnique({
      where: { username: username },
      select: { username: true, userId: true },
    });

    // TODO: throw error username already in use
    if (existUserName && !existUserName.userId === userId) {
      throw new ConflictException(`Username ${username} is already taken`);
    }

    return {
      message: 'Username is available',
      username,
    };
  }

  // Update profile by userId
  async updateProfile(reqUserId: any, updateProfile: UpdateProfileDto) {
    // TODO: Check if username already exists
    const existUsername = await this.prisma.userProfile.findUnique({
      where: { username: updateProfile.username },
      select: { username: true, userId: true },
    });

    if (existUsername && !existUsername.userId === reqUserId) {
      throw new ConflictException(
        `Username ${updateProfile.username} is already taken`,
      );
    }

    // TODO: update in database
    await this.prisma.userProfile.update({
      where: { userId: reqUserId },
      data: {
        name: updateProfile.fullName,
        username: updateProfile.username,
        gender: updateProfile.gender,
        bio: updateProfile.bio,
        pronouns: updateProfile.pronouns,
        dob: updateProfile.dob,
        music: updateProfile.music,
        link: updateProfile.link,
      },
    });
  }

  // Delete profile by userId
  // async removeProfile(userId: string) {
  //   return this.prisma.userProfile.delete({
  //     where: { userId: userId },
  //   });
  // }
  // community users entry with TCP

  // Profile users entry with TCP
  private async verifyWithTCP(userId: string) {
    // call to auth-service and res back
    const res = await this.client
      .send<{
        isValid: boolean;
      }>({ cmd: 'verify-user' }, { userId: userId })
      .toPromise();

    if (!res?.isValid) {
      throw new UnauthorizedException('Wrong credentials');
    }
    return true;
  }

  private async genrateUniuqeUsernames(fullName: string) {
    const parts = fullName.trim().toLowerCase().split(' ');
    const first = parts[0];
    const last = parts.length > 1 ? parts[parts.length - 1] : '';

    const candidates = [
      `${first}_${last}`,
      `${first}${last}${Math.floor(Math.random() * 10)}`,
      `${first}${Math.floor(Math.random() * 1000)}`,
    ];

    const foundUsername = await this.prisma.userProfile.findMany({
      where: {
        username: {
          in: candidates,
        },
      },
      select: { username: true },
    });

    // Filtering the existing username
    const unique = candidates.filter(
      (u) => !foundUsername[0]?.username?.includes(u),
    );

    // TODO: if already taken, keep generate until there are unique
    while (unique.length < 3) {
      const newCandidates = `${first}${Math.floor(Math.random() * 10000)}`;

      // verify first to inserting
      const existNewCandidates = await this.prisma.userProfile.findUnique({
        where: { username: newCandidates },
        select: { username: true },
      });

      if (!existNewCandidates && !unique.includes(newCandidates)) {
        unique.push(newCandidates);
      }
    }

    return unique;
  }
}
