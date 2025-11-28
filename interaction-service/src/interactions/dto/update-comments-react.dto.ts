import { ReactTypes } from "../schemas/commentsReact.schema";
import { IsEnum, IsOptional, IsString } from "class-validator";



export class UpdateCommentsReactDto {

    @IsOptional()
    @IsString()
    userId: string;

    @IsOptional()
    @IsString()
    postId: string;

    @IsOptional()
    @IsEnum(ReactTypes, {
        message: 'reactType must be one of the following values: LIKE, LOVE, HAHA, WOW, SAD, ANGRY',
    })
    reactType: ReactTypes;

    @IsOptional()
    @IsString()
    commentId: string;

}