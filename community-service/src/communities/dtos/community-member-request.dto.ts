import { IsNotEmpty, IsString } from 'class-validator';

export class CommunityMemberRequestDto {
  @IsString()
  @IsNotEmpty()
  targetUserId: string;

  @IsString()
  @IsNotEmpty()
  targetCommunityId: string;
}
