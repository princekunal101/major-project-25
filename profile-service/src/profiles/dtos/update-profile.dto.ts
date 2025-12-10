import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDate,
  Length,
  Matches,
} from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  @Length(2, 20)
  fullName: string;

  @IsOptional()
  @IsString()
  @Length(3, 20)
  @Matches(/^[a-zA-Z0-9_.]+$/, {
    message: 'Username can only contains letters, numbers and userscores',
  })
  username: string;

  @IsString()
  @IsOptional()
  gender: string;

  @IsString()
  @IsOptional()
  bio: string;

  @IsString()
  @IsOptional()
  pronouns: string;

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
