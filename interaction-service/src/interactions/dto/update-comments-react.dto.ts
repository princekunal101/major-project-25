import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ReactType } from '../schemas/react.schema';

export class UpdateCommentsReactDto {
  @IsOptional()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  postId: string;

  @IsOptional()
  @IsEnum(ReactType)
  reactType: ReactType;

  @IsOptional()
  @IsString()
  commentId: string;
}
