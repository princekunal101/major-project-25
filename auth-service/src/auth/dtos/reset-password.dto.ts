import { IsString, Matches, MinLength } from "class-validator";

export class ResetPasswordDto {
    @IsString()
    resetToken: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[0-9])/, { message: 'Password must contan at least one number'})
  newPassword: string;
}