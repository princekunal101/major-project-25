import { IsNotEmpty, IsString } from 'class-validator';

export class GatewayCommunityAdminDto {
  @IsString()
  @IsNotEmpty()
  targetCommunityId: string;

  @IsString()
  @IsNotEmpty()
  targetUserId: string;
}
