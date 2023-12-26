import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateClientDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  status: boolean;
}
