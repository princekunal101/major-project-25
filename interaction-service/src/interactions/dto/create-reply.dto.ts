import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReplyDto {
  @IsNotEmpty()
  @IsString()
  readonly postId: string;

  @IsNotEmpty()
  @IsString()
  readonly commentId: string;

  @IsString()
  @IsOptional()
  replyId: string;

  @IsNotEmpty()
  @IsString()
  data: string;
}
