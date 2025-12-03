import { Body, Controller, Post } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { UsersNameDto } from './dtos/users-name.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  // TODO: POST inserting the username
  @Post('set-name')
  async setUsersName(@Body() uname: UsersNameDto) {
    return this.profilesService.setUsersName(uname);
  }
}
