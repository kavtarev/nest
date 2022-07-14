import { IsString } from 'class-validator';

export class RegistrationDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
