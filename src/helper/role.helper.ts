import { RoleEnum } from 'src/enums/role.enum';

export function matchRoles(
  roles: RoleEnum[],
  requiredRoles: RoleEnum[],
): boolean {
  return roles.some((role) =>
    requiredRoles.some((requiredRole) => requiredRole === role),
  );
}
