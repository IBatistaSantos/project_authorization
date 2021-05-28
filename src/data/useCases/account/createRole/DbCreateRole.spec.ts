import {
  mockCreateRoleRepository,
  mockLoadRoleByNameRepository,
} from "@/data/test/mockRole";
import { mockCreateRoleParams, mockRoleModel } from "@/domain/test/mockRole";

import { DbCreateRole } from "./DbCreateRole";

const makeSut = () => {
  const loadRoleByNameRepositoryStub = mockLoadRoleByNameRepository();

  jest
    .spyOn(loadRoleByNameRepositoryStub, "loadRoleByName")
    .mockReturnValue(Promise.resolve(null));

  const createRoleRepositoryStub = mockCreateRoleRepository();
  const sut = new DbCreateRole(
    loadRoleByNameRepositoryStub,
    createRoleRepositoryStub
  );

  return {
    sut,
    createRoleRepositoryStub,
    loadRoleByNameRepositoryStub,
  };
};

describe("DBCreateRole Test", () => {
  it("Should call LoadRoleByNameRepository with correct value", async () => {
    const { sut, loadRoleByNameRepositoryStub } = makeSut();

    const repositorySpy = jest.spyOn(
      loadRoleByNameRepositoryStub,
      "loadRoleByName"
    );

    const createRoleParams = mockCreateRoleParams();

    await sut.create(createRoleParams);

    expect(repositorySpy).toHaveBeenCalledWith(createRoleParams.name);
  });
  it("Should return null if LoadRoleByName repository finds one", async () => {
    const { sut, loadRoleByNameRepositoryStub } = makeSut();

    jest
      .spyOn(loadRoleByNameRepositoryStub, "loadRoleByName")
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
