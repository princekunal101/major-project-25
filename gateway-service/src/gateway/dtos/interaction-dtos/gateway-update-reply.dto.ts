import { IsNotEmpty, IsString } from 'class-validator';

export class GatewayUpdateReplyDto {
  @IsNotEmpty()
  @IsString()
  postId: string;

  @IsString()
  @IsNotEmpty()
  data: string;
}
