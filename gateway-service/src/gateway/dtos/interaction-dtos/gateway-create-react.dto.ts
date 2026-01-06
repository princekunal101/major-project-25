
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class GatewayCreateReactDto {
  @IsNotEmpty()
  @IsString()
  readonly postId: string;

  @IsNotEmpty()
  @IsString()
  readonly reactType: string;
}
