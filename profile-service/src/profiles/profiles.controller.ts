import { Body, Controller, Post,Get,Put, Delete } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfilesDto } from './dtos/create-profiles.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  // TODO: POST inserting the username
  
  @Post('new-profile')
  async setNewUser(@Body() createProfile: CreateProfilesDto) {
    return this.profilesService.setUsersName(createProfile);
  }


  @Get()
  async findAllProfiles() {
    return this.profilesService.findAllProfiles();
  }

  @Get(':userId')
  async findOneProfileByUserId(@Body('userId') userId: string) {
    return this.profilesService.findOneProfileByUserId(userId);
  }

  // @Put(':userId')
  // async updateProfile(
  //   @Body('userId') userId: string,
  //   @Body('usersname') usersname: string,
  // ) {
  //   return this.profilesService.updateProfile(userId, usersname);
  // }
  @Put(':userId')
  async updateProfile(@Body() updateProfileDto:  UpdateProfileDto) {
    return this.profilesService.updateProfile(updateProfileDto);
  }

  
  @Put('username/:userId')
  async updateUsername(
    @Body('userId') userId: string,   
    @Body('username') username: string,
  ) {
    return this.profilesService.updateUsername(userId, username);
  }


  @Delete(':userId')
  async removeProfile(@Body('userId') userId: string) {
    return this.profilesService.removeProfile(userId);
  }
}
