import { IsEmail, IsString } from 'class-validator';

export class SignupOtpVerifyDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  otp: string;
}
