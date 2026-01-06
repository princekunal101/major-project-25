import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class GatewayCreateCommentsReactDto {
  @IsNotEmpty()
  @IsString()
  postId: string;

  @IsNotEmpty()
  @IsString()
  commentId: string;

  @IsNotEmpty()
  @IsString()
  reactType: string;
}
