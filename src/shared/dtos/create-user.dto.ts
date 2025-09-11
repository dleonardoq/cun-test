import { IsEmail, IsNotEmpty, IsString, IsNumber, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  identifyNumber: number;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}