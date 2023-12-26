import { ApiProperty } from "@nestjs/swagger";
import { BaseQueryParanetersDto } from "src/shared/dto/base-query-parameters.dto";

export class FindUsersQueryDto extends BaseQueryParanetersDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  role: string;
}
