import { User } from "../entities/user.entity";

export class FoundUsersDto {
  users: User[];
  total: number;
}
