import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ReactType } from '../schemas/react.schema';

export class CreateCommentsReactDto {
  @IsNotEmpty()
  @IsString()
  readonly postId: string;

  @IsNotEmpty()
  @IsString()
  readonly commentId: string;

  @IsNotEmpty()
  @IsEnum(ReactType)
  readonly reactType: ReactType;
}
