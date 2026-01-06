import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

export class GatewayPostContentDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50, {
    message: 'Title must me greater then 2 and less than 50 char',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 80, {
    message: 'Title must me greater then 3 and less than 80 char',
  })
  subTitle: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags: string[];

  @IsOptional()
  @IsString()
  summaryTitle: string;

  @IsOptional()
  @IsString()
  summary: string;
}

export class GatewayGeneratePostDto {
  @IsNotEmpty()
  @IsString()
  communityId: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => GatewayPostContentDto)
  content: GatewayPostContentDto;

  @IsNotEmpty()
  @IsString()
  content_type: string;

  @IsOptional()
  @IsString()
  imageUrl: string;
}
