import { IsOptional,IsString } from "class-validator";


export class UpdatePostsDto {


    @IsOptional()
    @IsString()
    readonly userId: string;

    @IsOptional()
    @IsString()
    readonly content: string;

    @IsOptional()
    @IsString()
    readonly imageUrl: string;
    
    @IsOptional()
    @IsString()
    readonly communityId: string;
}