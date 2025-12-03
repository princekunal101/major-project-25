import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersNameDto } from './dtos/users-name.dto';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  // TODO: Creating inserting user's name NOT unique username
  async setUsersName(usersName: UsersNameDto) {
    await this.prisma.userProfile.upsert({
      where: { userId: usersName.userId },
      update: { name: usersName.usersname },
      create: {
        userId: usersName.userId,
        name: usersName.usersname,
      },
    });
  }
}
