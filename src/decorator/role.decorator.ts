import { SetMetadata } from '@nestjs/common';
import { RoleType } from 'src/modules/auth/enums/roleType.enum';

export const ROLE_KEY = 'role';
export const SetRoles = (...rols: RoleType[]) => SetMetadata(ROLE_KEY, rols);
