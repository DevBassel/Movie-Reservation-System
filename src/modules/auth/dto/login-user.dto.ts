import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 16)
  password: string;
}
