import {
  mockAuthenticationParams,
  mockEncrypter,
  mockHashComparer,
  mockUserRepository,
} from "@/data/test";

import { DbAuthentication } from "./DbAuthenticatedUser";

const makeSut = () => {
  const userRepository = mockUserRepository();
  const hashComparerStub = mockHashComparer();
  const encrypterStub = mockEncrypter();

  const sut = new DbAuthentication(
    userRepository,
    hashComparerStub,
    encrypterStub
  );

  return {
    sut,
    userRepository,
    hashComparerStub,
    encrypterStub,
  };
};

describe("DbAuthentication Test", () => {
  it("should call LoadUserByEmail with correct value", async () => {
    const { sut, userRepository } = makeSut();

    const repositorySpy = jest.spyOn(userRepository, "loadByEmail");

    const authenticationParams = mockAuthenticationParams();

    await sut.auth(authenticationParams);

    expect(repositorySpy).toHaveBeenCalledWith(authenticationParams.email);
  });

  it("should throw if LoadUserByEmail throws", async () => {
    const { sut, userRepository } = makeSut();

    jest
      .spyOn(userRepository, "loadByEmail")
      .mockReturnValueOnce(Promise.reject(new Error()));

    await expect(sut.auth(mockAuthenticationParams())).rejects.toThrow();
  });

  it("should call HashComparer with correct values", async () => {
    const { sut, hashComparerStub } = makeSut();

    const hashSpy = jest.spyOn(hashComparerStub, "compare");

    const authenticationParams = mockAuthenticationParams();

    await sut.auth(authenticationParams);

    const { password } = authenticationParams;

    expect(hashSpy).toHaveBeenCalledWith(password, password);
  });

  it("should throw if HashComparer throws", async () => {
    const { sut, hashComparerStub } = makeSut();

    jest
      .spyOn(hashComparerStub, "compare")
      .mockReturnValueOnce(Promise.reject(new Error()));

    await expect(sut.auth(mockAuthenticationParams())).rejects.toThrow();
  });

  it("should call Encrypter with correct value", async () => {
    const { sut, encrypterStub } = makeSut();

    const encryptSpy = jest.spyOn(encrypterStub, "encrypt");

    const authenticationParams = mockAuthenticationParams();

    await sut.auth(authenticationParams);

    expect(encryptSpy).toHaveBeenCalledWith("anyid");
  });

  it("should throw if Encrypter throws", async () => {
    const { sut, encrypterStub } = makeSut();

    jest
      .spyOn(encrypterStub, "encrypt")
      .mockReturnValueOnce(Promise.reject(new Error()));

    await expect(sut.auth(mockAuthenticationParams())).rejects.toThrow();
  });

  it("should return null if LoadUserByEmail return null", async () => {
    const { sut, userRepository } = makeSut();

    jest
      .spyOn(userRepository, "loadByEmail")
      .mockReturnValueOnce(Promise.resolve(null));

    const response = await sut.auth(mockAuthenticationParams());

    expect(response).toBeNull();
  });

  it("should return null if HashComparer compare returns false", async () => {
    const { sut, hashComparerStub } = makeSut();

    jest
      .spyOn(hashComparerStub, "compare")
      .mockReturnValueOnce(Promise.resolve(false));

    const response = await sut.auth(mockAuthenticationParams());

    expect(response).toBeNull();
  });

  it("should return name, email and token on success", async () => {
    const { sut } = makeSut();

    const response = await sut.auth(mockAuthenticationParams());

    expect(response).toBeTruthy();
    expect(response).toHaveProperty("name");
    expect(response).toHaveProperty("email");
    expect(response).toHaveProperty("token");
  });
});
