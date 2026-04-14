import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @Matches(/[A-Z]/, { message: 'Must contain uppercase letter' })
  @Matches(/[a-z]/, { message: 'Must contain lowercase letter' })
  @Matches(/\d/, { message: 'Must contain number' })
  @Matches(/[^A-Za-z0-9]/, { message: 'Must contain special character' })
  password!: string;

  @IsString()
  name!: string;
}
