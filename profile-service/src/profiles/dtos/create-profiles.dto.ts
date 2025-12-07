import { IsDate, IsNotEmpty, IsOptional, IsString,  } from 'class-validator';

export class CreateProfilesDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  usersname: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  bio: string;

  @IsString()
  @IsOptional()
  pronouns: string;

  @IsString()
  @IsOptional()
  gender: string;

  @IsDate()
 @IsOptional()
  dob: Date;

  @IsString()
 @IsOptional()
  music: string;

  @IsString()
 @IsOptional()
  link: string;


}
