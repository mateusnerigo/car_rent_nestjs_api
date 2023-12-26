import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class CreateClientDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MaxLength(200)
  @ApiProperty()
  name: string;
}
