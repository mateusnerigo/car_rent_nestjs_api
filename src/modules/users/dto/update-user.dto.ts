import { IsEmail, IsOptional, IsString } from "class-validator";

import { UserRole } from "../enums/user-roles.enum";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  role: UserRole;

  @IsOptional()
  status: boolean;
}
