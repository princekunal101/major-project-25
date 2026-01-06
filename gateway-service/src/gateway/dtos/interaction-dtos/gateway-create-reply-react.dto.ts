import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class GatewayCreateReplyReactDto {
  @IsNotEmpty()
  @IsString()
  readonly postId: string;

  @IsNotEmpty()
  @IsString()
  readonly replyId: string;

  @IsNotEmpty()
  @IsString()
  readonly reactType: string;
}
