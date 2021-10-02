import { SetMetadata } from '@nestjs/common';
import { EResource, EAction } from '../types/role';
export const ROLES_KEY = 'roles';

export const Roles = (actions: EAction[], resource: EResource) =>
  SetMetadata(ROLES_KEY, { actions, resource });
