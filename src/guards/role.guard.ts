import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredActions: any = this.reflector.getAllAndOverride<any[]>(
      ROLES_KEY,
      [ctx.getHandler(), ctx.getClass()],
    );
    const { actions, resource } = requiredActions;
    const request = ctx.switchToHttp().getRequest();
    const userRoles = request.user.roles;
    // get user resource actions
    const resourceObj = userRoles.find((r) => r.resource === resource);
    // Check if user has the same resource of the endpoint
    if (resourceObj) {
      // Check if the user has any of the required actions
      return actions.some((role) => resourceObj?.actions?.includes(role));
    }

    return false;
  }
}
