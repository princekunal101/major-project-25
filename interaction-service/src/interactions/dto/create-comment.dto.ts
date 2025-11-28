import { IsBoolean, IsNotEmpty,IsString } from "class-validator";



export class CreateCommentDto {

    @IsNotEmpty()
    @IsString()
    readonly userId: string;

    @IsNotEmpty()
    @IsString()
    readonly postId: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly isEdited: boolean;
}