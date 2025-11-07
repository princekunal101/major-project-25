import { IsEmail, IsString } from 'class-validator';

export class ForgotPasswordOtpVerifyDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  otp: string;
}
