import { IsEmail, IsString } from 'class-validator';

export class GatewaySignupEmailDto {
  @IsEmail()
  @IsString()
  email: string;
}
