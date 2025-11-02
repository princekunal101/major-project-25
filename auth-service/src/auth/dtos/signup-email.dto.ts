import { IsEmail, IsString } from 'class-validator';

export class SignupEmailDto {
  @IsEmail()
  @IsString()
  email: string;
}
