import { CommunityTopics, CommunityTypes, SharedValue } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCommunityDto {
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
  @IsEnum(CommunityTypes, {
    message: 'communityType must be: PRIVATE, PUBLIC, RESTRICTED',
  })
  communityType: CommunityTypes;

  @IsString()
  @IsEnum(CommunityTopics, {
    message:
      'communityTopic must be one of:  TOPIC, BRAND, CREATOR, MOVEMEMT, CAUSE, IDENTITY',
  })
  communityTopic: CommunityTopics;

  @IsString()
  @IsEnum(SharedValue, {
    message:
      'sharedValue must be one of: KNOWLEDGE_SHARING, ACTIVISM, ENTERTAINMENT, CREATIVITY, INNOVATION, SUPPORT',
  })
  sharedValue: SharedValue;
}
