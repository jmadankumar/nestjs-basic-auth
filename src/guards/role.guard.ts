import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { RoleEnum } from 'src/enums/role.enum';
import { matchRoles } from 'src/helper/role.helper';
import { UserDto } from 'src/modules/user/dto';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest() as Request;

    const user = request.user as UserDto;
    const roles = user.roles.map((role) => role.id as RoleEnum);

    return matchRoles(roles, requiredRoles);
  }
}
