import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
