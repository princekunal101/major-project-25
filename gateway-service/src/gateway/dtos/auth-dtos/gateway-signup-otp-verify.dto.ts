import { IsEmail, IsString, Length } from 'class-validator';

export class GatewaySignupOtpVerifyDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(6)
  otp: string;
}
