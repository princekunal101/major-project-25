import { IsBoolean, IsEmail, IsString } from "class-validator";

export class ForgotPasswordDto {
    @IsEmail()
    @IsString()
    email: string;

    @IsBoolean()
    isOtpMode: boolean;
}