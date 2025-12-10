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
    @IsEnum(ReactType)
    reactType: ReactType;

}