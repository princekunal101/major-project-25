import { ReactType } from '../schemas/react.schema';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateReactDto {

    @IsOptional()
    @IsString()
    userId: string;

    @IsOptional()
    @IsString()
    postId: string;

    @IsOptional()
    @IsEnum(ReactType, {
        message: 'reactType must be one of the following values: LIKE, LOVE, HAHA, WOW, SAD, ANGRY',
    })
    reactType: ReactType;

    @IsOptional()
    
    createdAt: Date;

}