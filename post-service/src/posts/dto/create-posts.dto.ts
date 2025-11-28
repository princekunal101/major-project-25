import {IsNotEmpty, IsString } from 'class-validator';

export class CreatePostsDto {

    @IsNotEmpty()
    @IsString()
    readonly userId: string;


    @IsNotEmpty()
    @IsString()
    readonly content: string;

    @IsNotEmpty()
    @IsString()
    readonly imageUrl: string;

    @IsNotEmpty()
    @IsString()
    readonly communityId: string;
}