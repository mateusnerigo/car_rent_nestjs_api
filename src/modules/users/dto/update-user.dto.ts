import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";

import { UserRole } from "../enums/user-roles.enum";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  @ApiProperty()
  email: string;

  @IsOptional()
  @ApiProperty()
  role: UserRole;

  @IsOptional()
  @ApiProperty()
  status: boolean;
}
