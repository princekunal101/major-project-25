import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class SignupSetPasswordDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    { message: 'Password must be like Abcd@123' },
  )
  password: string;
}
