import { IsNotEmpty, IsString } from 'class-validator';

export class GatewayCommunityMemberRequestDto {
  @IsString()
  @IsNotEmpty()
  targetUserId: string;

  @IsString()
  @IsNotEmpty()
  targetCommunityId: string;
}
