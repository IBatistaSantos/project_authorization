interface ICanPermissionUser {
  canPermissionUser(permission: string, userId: string): Promise<boolean>;
}

export { ICanPermissionUser };
