import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class GatewayCreateCommunityDto {
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(21)
  communityName: string;

  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  guideline?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];

  @IsString()
  communityType: string;

  @IsString()
  communityTopic: string;

  @IsString()
  sharedValue: string;
}
