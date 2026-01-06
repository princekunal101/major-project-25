import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class GatewayCreateCommentDto {
  @IsNotEmpty()
  @IsString()
  postId: string;

  @IsNotEmpty()
  @IsString()
  data: string;

}
