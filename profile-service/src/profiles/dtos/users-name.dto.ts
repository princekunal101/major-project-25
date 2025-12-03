import { IsNotEmpty, IsString } from 'class-validator';

export class UsersNameDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  usersname: string;
}
