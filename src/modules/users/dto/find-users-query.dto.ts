import { BaseQueryParanetersDto } from "src/shared/dto/base-query-parameters.dto";

export class FindUsersQueryDto extends BaseQueryParanetersDto {
  name: string;
  email: string;
  status: boolean;
  role: string;
}
