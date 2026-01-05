import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class GatewaySignupSetPasswordDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/,
    {
      message:
        'Password must be one capital letter, must be one small letter, must be one number, must be one special charecter',
    },
  )
  // @Matches(/[A-Z]/, {message: 'Password must contain at least one uppercase letter'})
  // @Matches(/[a-z]/, {message: 'at least one lowercase letter'})
  // @Matches(/[0-9]/, {message: 'at least one number'})
  // @Matches(/[!@#$%^&*(),.?{}|<>]/, {message: 'at least one special charecter'})
  password: string;
}
