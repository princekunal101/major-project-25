import { ReactType } from '../schemas/react.schema';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';


export class CreateReactDto {
    @IsNotEmpty()
    @IsString()
    readonly userId: string;

    @IsNotEmpty()
    @IsString()
    readonly postId: string;

    @IsNotEmpty()
    @IsEnum(ReactType, { message: 'reactType must be one of the predefined values.' })
    readonly reactType: ReactType;

    
    readonly createdAt: Date;
}