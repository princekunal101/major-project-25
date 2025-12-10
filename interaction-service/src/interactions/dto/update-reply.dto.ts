import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateReplyDto {
  @IsOptional()
  @IsString()
  postId: string;

  @IsString()
  @IsNotEmpty()
  data: string;
}
