import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfilesDto } from './dtos/create-profiles.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';


@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}
  

 


  // TODO: Creating inserting user's name NOT unique username
  // Upsert to handle both create and update scenarios
  async setUsersName(createProfile: CreateProfilesDto) {
    await this.prisma.userProfile.upsert({
      where: { userId: createProfile.userId },
      update: { name: createProfile.usersname },
      create: {
        userId: createProfile.userId,
        name: createProfile.usersname,
        
      },
    });
  }

  // Get all profiles
  async findAllProfiles() {
    return this.prisma.userProfile.findMany();
  }

  // Get profile by userId
  async findOneProfileByUserId(userId: string) {
    return this.prisma.userProfile.findUnique({
      where: { userId: userId },
    });
  }

// Update profile by userId
  async updateProfile(updateProfile:UpdateProfileDto) {
    return this.prisma.userProfile.update({
      where: { userId: updateProfile.userId },
      data: { name: updateProfile.usersname, 
        username: updateProfile.usersname,
        gender: updateProfile.gender,
        bio: updateProfile.bio,
        pronouns: updateProfile.pronouns,
        dob: updateProfile.dob,
        music: updateProfile.music,
        link: updateProfile.link},
      

    });
  }

  async updateUsername(userId: string, username: string) {
    return this.prisma.userProfile.update({
      where: { userId: userId },
      data: { username: username },
    });
    
  }

// Delete profile by userId
  async removeProfile(userId: string) {
    return this.prisma.userProfile.delete({
      where: { userId: userId },
    });
  }

}
