import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CheckAvailableUsernameDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @Matches(/^[a-zA-Z0-9_.]+$/, {
    message: 'Username can only contains letters, numbers and userscores',
  })
  username: string;
}
