import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MaxLength(200)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  passwordConfirmation: string;
}
