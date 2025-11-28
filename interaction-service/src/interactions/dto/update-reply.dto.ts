import { IsBoolean, IsOptional, IsString } from 'class-validator';



export class UpdateReplyDto {

    @IsOptional()
    @IsString()
    userId: string;

    @IsOptional()
    @IsString()
    postId: string;

    @IsOptional()
    @IsString()
    commentId: string;

    @IsOptional()
    @IsBoolean()
    isEdited: boolean;

    
}
