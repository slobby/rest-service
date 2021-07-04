import { IsString } from 'class-validator';

export class CreateLoginDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
