import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateReplyDto {
  @IsNotEmpty()
  @IsString()
  postId: string;

  @IsString()
  @IsNotEmpty()
  data: string;
}
