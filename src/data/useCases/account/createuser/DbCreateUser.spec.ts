import { mockUserRepository, mockHasher } from "@/data/test";
import { mockPermissionRepository } from "@/data/test/mockPermission";
import { mockRoleRepository } from "@/data/test/mockRole";
import { mockUserModel, mockCreateAccountParams } from "@/domain/test";

import { DbCreateUser } from "./DbCreateUser";

const makeSut = () => {
  const mockUserRepositoryStub = mockUserRepository();
  const mockRoleRepositoryStub = mockRoleRepository();
  const mockPermissionRepositoryStub = mockPermissionRepository();

  jest
    .spyOn(mockUserRepositoryStub, "loadByEmail")
    .mockReturnValue(Promise.resolve(null));

  const hasherStub = mockHasher();

  const sut = new DbCreateUser(
    hasherStub,
    mockUserRepositoryStub,
    mockRoleRepositoryStub,
    mockPermissionRepositoryStub
  );

  return {
    sut,
    mockUserRepositoryStub,
    hasherStub,
  };
};

describe("DbCreateUser Test", () => {
  it("should call LoadUserByEmailRepository with correct value", async () => {
    const { sut, mockUserRepositoryStub } = makeSut();

    const repositorySpy = jest.spyOn(mockUserRepositoryStub, "loadByEmail");

    const createUserParams = mockCreateAccountParams();

    await sut.create(createUserParams);

    expect(repositorySpy).toHaveBeenCalledWith(createUserParams.email);
  });

  it("should throw if LoadUserByEmailRepository throws", async () => {
    const { sut, mockUserRepositoryStub } = makeSut();

    jest
      .spyOn(mockUserRepositoryStub, "loadByEmail")
      .mockReturnValueOnce(Promise.reject(new Error()));

    await expect(sut.create(mockCreateAccountParams())).rejects.toThrow();
  });

  it("should return null if LoadUserByEmail repository finds one", async () => {
    const { sut, mockUserRepositoryStub } = makeSut();

    jest
      .spyOn(mockUserRepositoryStub, "loadByEmail")
      .mockReturnValueOnce(Promise.resolve(mockUserModel()));

    const response = await sut.create(mockCreateAccountParams());

    expect(response).toBeNull();
  });

  it("should call CreateUserRepository with correct values", async () => {
    const { sut, mockUserRepositoryStub } = makeSut();

    const repositorySpy = jest.spyOn(mockUserRepositoryStub, "create");

    const createUserParams = mockCreateAccountParams();

    await sut.create(createUserParams);

    expect(repositorySpy).toHaveBeenCalled();
  });

  it("should throw if CreateUserRepository throws", async () => {
    const { sut, mockUserRepositoryStub } = makeSut();

    jest
      .spyOn(mockUserRepositoryStub, "create")
      .mockReturnValueOnce(Promise.reject(new Error()));

    await expect(sut.create(mockCreateAccountParams())).rejects.toThrow();
  });

  it("should call Hasher with correct value", async () => {
    const { sut, hasherStub } = makeSut();

    const hashSpy = jest.spyOn(hasherStub, "generate");

    const createUserParams = mockCreateAccountParams();

    await sut.create(createUserParams);

    expect(hashSpy).toHaveBeenCalledWith(createUserParams.password);
  });

  it("should throw if Hasher throws", async () => {
    const { sut, hasherStub } = makeSut();

    jest
      .spyOn(hasherStub, "generate")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const createUserParams = mockCreateAccountParams();

    await expect(sut.create(createUserParams)).rejects.toThrow();
  });

  it("should return a user model on success", async () => {
    const { sut } = makeSut();

    const userModel = await sut.create(mockCreateAccountParams());

    expect(userModel).toEqual(mockUserModel());
  });
});
