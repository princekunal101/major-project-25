import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  UseGuards,
  Req,
  Query,
  Param,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfileFullNameDto } from './dtos/profie-fullname.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { ProfileUsernameDto } from './dtos/profile-username.dto';
import { CheckAvailableUsernameDto } from './dtos/check-available-username.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  // TODO: POST inserting the fullname
  @Post('create-profile')
  async setNewUser(@Body() createProfile: ProfileFullNameDto) {
    return this.profilesService.setFullName(createProfile);
  }

  // TODO: POST inserting the unique username
  @Post('set-username')
  async updateUsername(
    @Req() req: any,
    @Body() profileUsername: ProfileUsernameDto,
  ) {
    return this.profilesService.updateUsername(profileUsername);
  }

  // @Get()
  // async findAllProfiles() {
  //   return this.profilesService.findAllProfiles();
  // }

  @Get('get-profile/:id')
  async getUserProfile(@Param('id') userId: string) {
    return this.profilesService.getUserProfile(userId);
  }

  // @Put(':userId')
  // async updateProfile(
  //   @Body('userId') userId: string,
  //   @Body('usersname') usersname: string,
  // ) {
  //   return this.profilesService.updateProfile(userId, usersname);
  // }

  // GET All Communities Entry Point
  @Get('check-username/:id')
  async getAllCommunities(
    @Param('id') userId: string,
    @Query() query: CheckAvailableUsernameDto,
  ) {
    return this.profilesService.checkUserName(userId, query);
  }

  // PUT update profile method
  @Put('update-profile/:id')
  async updateProfile(
    @Param('id') userId: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.updateProfile(userId, updateProfileDto);
  }

  // @Delete(':userId')
  // async removeProfile(@Body('userId') userId: string) {
  //   return this.profilesService.removeProfile(userId);
  // }
}
