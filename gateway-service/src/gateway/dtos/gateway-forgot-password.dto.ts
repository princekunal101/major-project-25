import { IsBoolean, IsEmail, IsString } from "class-validator";

export class GatewayForgotPasswordDto {
    @IsEmail()
    @IsString()
    email: string;

    @IsBoolean()
    isOtpMode: boolean;
}