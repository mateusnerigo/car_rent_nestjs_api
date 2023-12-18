import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      const requiredRole = this.reflector.get<string> (
        'role',
        context.getHandler(),
      );

      return (!requiredRole)
        ? true
        : (request.user.role === requiredRole);
  }
}
