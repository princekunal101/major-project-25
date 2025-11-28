import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto {

    @IsOptional()
    @IsString()
    readonly userId: string;

    @IsOptional()
    @IsString()
    readonly postId: string;

    @IsOptional()
    @IsBoolean()
    readonly isEdited: boolean;

}