import { IsEmail, IsString } from "class-validator";

export class GatewayLoginDto {
    @IsEmail()
    email:string;

    @IsString()
    password: string;
}