import { mockPermissionRepository } from "@/data/test/mockPermission";
import { mockCreatePermissionParams, mockPermissionModel } from "@/domain/test";

import { DbCreatePermission } from "./DbCreatePermission";

const makeSut = () => {
  const permissionRepositoryStub = mockPermissionRepository();
  const sut = new DbCreatePermission(permissionRepositoryStub);

  jest
    .spyOn(permissionRepositoryStub, "loadPermissionByName")
    .mockReturnValue(Promise.resolve(null));

  return {
    sut,
    createPermissionRepositoryStub: permissionRepositoryStub,
  };
};

describe("DBCreatePermission Test", () => {
  it("Should call loadPermissionByName with correct value", async () => {
    const { sut, createPermissionRepositoryStub } = makeSut();

    const repositorySpy = jest.spyOn(
      createPermissionRepositoryStub,
      "loadPermissionByName"
    );

    const { name } = mockCreatePermissionParams();

    await sut.create(mockCreatePermissionParams());

    expect(repositorySpy).toHaveBeenCalledWith(name);
  });

  it("Should return null if loadPermissionByName repository finds one", async () => {
    const { sut, createPermissionRepositoryStub } = makeSut();

    jest
      .spyOn(createPermissionRepositoryStub, "loadPermissionByName")
      .mockReturnValueOnce(Promise.resolve(mockPermissionModel()));

    const response = await sut.create(mockCreatePermissionParams());

    expect(response).toBeNull();
  });

  it("Should call PermissionRepository with correct values", async () => {
    const { sut, createPermissionRepositoryStub } = makeSut();

    const repositorySpy = jest.spyOn(createPermissionRepositoryStub, "create");

    const createPermissionParams = mockCreatePermissionParams();

    await sut.create(createPermissionParams);

    expect(repositorySpy).toHaveBeenCalledWith(createPermissionParams);
  });

  it("should return a permission model on success", async () => {
    const { sut } = makeSut();
    const userModel = await sut.create(mockCreatePermissionParams());
    expect(userModel).toEqual(mockPermissionModel());
  });
});
