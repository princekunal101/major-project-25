import { IsBoolean, IsNotEmpty, IsString } from "class-validator";



export class CreateReplyDto {
    @IsNotEmpty()
    @IsString()
    readonly userId: string;    

    @IsNotEmpty()
    @IsString()
    readonly postId: string;


    @IsNotEmpty()
    @IsString()
    readonly commentId: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly isEdited: boolean;
}