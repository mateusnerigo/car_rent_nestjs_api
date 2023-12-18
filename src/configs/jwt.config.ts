import { JwtModuleOptions } from "@nestjs/jwt";

export const jwtConfig: JwtModuleOptions = {
  secret: 'secretToChangeMaybeGetFromEnv',
  signOptions: {
    expiresIn: 3600,
  },
}
