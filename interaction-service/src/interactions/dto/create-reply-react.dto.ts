import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ReactType } from '../schemas/react.schema';

export class CreateReplyReactDto {
  @IsNotEmpty()
  @IsString()
  readonly postId: string;

  @IsNotEmpty()
  @IsString()
  readonly replyId: string;

  @IsNotEmpty()
  @IsEnum(ReactType)
  readonly reactType: ReactType;
}
