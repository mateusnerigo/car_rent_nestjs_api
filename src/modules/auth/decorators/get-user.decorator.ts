import { createParamDecorator } from "@nestjs/common";

import { User } from "src/modules/users/entities/user.entity";

export const GetUser = createParamDecorator(
  (data, req): User => {
    return req.args[0].user;
  }
)
