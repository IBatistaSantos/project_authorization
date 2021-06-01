interface IIsRoleUser {
  isRoleUser(roleName: string, userId: string): Promise<boolean>;
}

export { IIsRoleUser };
