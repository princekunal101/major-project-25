import { IsNotEmpty, IsString } from 'class-validator';

export class CommunityAdminDto {
  @IsString()
  @IsNotEmpty()
  targetCommunityId: string;

  @IsString()
  @IsNotEmpty()
  targetUserId: string;
}
