import { EResource, EAction } from '../../types/role';
export const rolesStub = [
  // Roles
  {
    name: 'RoleFullAccess',
    resource: EResource.ROLE,
    actions: [EAction.MANAGE],
  },
  {
    name: 'RoleReadOnly',
    resource: EResource.ROLE,
    actions: [EAction.READ],
  },
  {
    name: 'RoleCreateOnly',
    resource: EResource.ROLE,
    actions: [EAction.CREATE],
  },
  // auth
  {
    name: 'AuthFullAccess',
    resource: EResource.AUTH,
    actions: [EAction.MANAGE],
  },
];
