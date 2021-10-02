export enum EAction {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export enum EResource {
  ROLE = 'role',
  AUTH = 'auth',
  //...any other resouces
}

export interface Role {
  _id?: string;
  name?: string;
  resource?: EResource;
  actions?: EAction[];
  createdAt?: Date;
  updatedAt?: Date;
}
