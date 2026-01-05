import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class GatewayChangePasswordDto {
  @IsString()
  oldPassword: string;

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
  newPassword: string;
}
