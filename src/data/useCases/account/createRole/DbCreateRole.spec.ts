import { mockRoleRepository } from "@/data/test/mockRole";
import { mockCreateRoleParams, mockRoleModel } from "@/domain/test/mockRole";

import { DbCreateRole } from "./DbCreateRole";

const makeSut = () => {
  const roleRepositoryStub = mockRoleRepository();
  const sut = new DbCreateRole(roleRepositoryStub);

  jest
    .spyOn(roleRepositoryStub, "loadRoleByName")
    .mockReturnValue(Promise.resolve(null));

  return {
    sut,
    createRoleRepositoryStub: roleRepositoryStub,
  };
};

describe("DBCreateRole Test", () => {
  it("Should call loadRoleByName with correct value", async () => {
    const { sut, createRoleRepositoryStub } = makeSut();

    const repositorySpy = jest.spyOn(
      createRoleRepositoryStub,
      "loadRoleByName"
    );

    const createRoleParams = mockCreateRoleParams();

    await sut.create(mockCreateRoleParams());

    expect(repositorySpy).toHaveBeenCalledWith(createRoleParams.name);
  });

  it("Should return null if loadRoleByName repository finds one", async () => {
    const { sut, createRoleRepositoryStub } = makeSut();

    jest
      .spyOn(createRoleRepositoryStub, "loadRoleByName")
      .mockReturnValueOnce(Promise.resolve(mockRoleModel()));

    const response = await sut.create(mockCreateRoleParams());

    expect(response).toBeNull();
  });

  it("Should call CreateRoleRepository with correct values", async () => {
    const { sut, createRoleRepositoryStub } = makeSut();

    const repositorySpy = jest.spyOn(createRoleRepositoryStub, "create");

    const createRoleParams = mockCreateRoleParams();

    await sut.create(createRoleParams);

    expect(repositorySpy).toHaveBeenCalledWith(createRoleParams);
  });
  it("should return a role model on success", async () => {
    const { sut } = makeSut();
    const userModel = await sut.create(mockCreateRoleParams());
    expect(userModel).toEqual(mockRoleModel());
  });
});
