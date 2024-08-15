import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from 'src/decorator/role.decorator';
import { RoleType } from 'src/modules/auth/enums/roleType.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiered = this.reflector.getAllAndOverride<RoleType[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log({ requiered });

    if (!requiered) return true;

    const { user } = context.switchToHttp().getRequest();

    return requiered.includes(user.role);
  }
}
