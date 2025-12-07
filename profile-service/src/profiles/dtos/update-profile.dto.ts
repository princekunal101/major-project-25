import { IsNotEmpty, IsOptional, IsString,IsDate } from "class-validator";

export class UpdateProfileDto {

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsOptional()
    usersname: string;

    @IsString()
    @IsOptional()
    username: string;

    @IsString()
    @IsOptional()
    gender: string;

    @IsString()
    @IsOptional()
    bio: string;

    @IsString()
    @IsOptional()
    pronouns: string;

    @IsDate()
    @IsOptional()
    dob: Date;

    @IsString()
    @IsOptional()
    music: string;
    @IsString()
    @IsOptional()
    link: string; 


}