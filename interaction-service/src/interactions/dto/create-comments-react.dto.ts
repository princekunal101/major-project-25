import { IsNotEmpty, IsString, IsEnum } from "class-validator";
import { ReactTypes } from "../schemas/commentsReact.schema";




export class CreateCommentsReactDto {

    @IsNotEmpty()
    @IsString()
    readonly userId: string;


    @IsNotEmpty()
    @IsString()
    readonly postId: string

    @IsNotEmpty()
    @IsEnum(ReactTypes, { message: 'reactTypes must be one of the predefined values.' })
    readonly reactType: ReactTypes;

    @IsNotEmpty()
    @IsString()
    readonly commentId: string;
    
}