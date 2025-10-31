import { IsString, Matches, MinLength } from "class-validator";

export class SignupDto {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[0-9])/, {message: 'Password must contan at least one number'})
    password: string;
}