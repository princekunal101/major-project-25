import { IsEmail, IsString } from 'class-validator';

export class GatewayForgotPasswordOtpVerifyDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  otp: string;
}
