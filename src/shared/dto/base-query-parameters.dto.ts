import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export abstract class BaseQueryParanetersDto {
  @IsOptional()
  @ApiProperty()
  sort: string;

  @IsOptional()
  @ApiProperty()
  page: number;

  @IsOptional()
  @ApiProperty()
  limit: number;
}
