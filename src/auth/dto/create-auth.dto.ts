import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}
