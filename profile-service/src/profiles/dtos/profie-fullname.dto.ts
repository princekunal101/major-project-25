import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ProfileFullNameDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 20, {
    message: "User's name must be grater than 2 and less than 20 char",
  })
  fullName: string;
}
