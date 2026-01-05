import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class GatewayUpdateCommunityDto {
  // @IsString()
  // communityId: string;

  @IsOptional()
  @IsString()
  displayName: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(21)
  communityName: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  guideline?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];

  @IsOptional()
  @IsString()
  communityType: string;

  @IsOptional()
  @IsString()
  communityTopic: string;

  @IsOptional()
  @IsString()
  sharedValue: string;
}
