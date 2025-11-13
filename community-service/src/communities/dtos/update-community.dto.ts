import { CommunityTopics, CommunityTypes, SharedValue } from '@prisma/client';
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

export class UpdateCommunityDto {
  @IsString()
  communityId: string;

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
  @IsEnum(CommunityTypes, {
    message: 'communityType must be: PRIVATE, PUBLIC, RESTRICTED',
  })
  communityType: CommunityTypes;

  @IsOptional()
  @IsString()
  @IsEnum(CommunityTopics, {
    message:
      'communityTopic must be one of:  TOPIC, BRAND, CREATOR, MOVEMEMT, CAUSE, IDENTITY',
  })
  communityTopic: CommunityTopics;

  @IsOptional()
  @IsString()
  @IsEnum(SharedValue, {
    message:
      'sharedValue must be one of: KNOWLEDGE_SHARING, ACTIVISM, ENTERTAINMENT, CREATIVITY, INNOVATION, SUPPORT',
  })
  sharedValue: SharedValue;
}
