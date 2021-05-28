import { UserModel } from "@/domain/models/User";
import { mockUserModel } from "@/domain/test";

import { IDecrypter } from "../protocols/crypto/Decrypter";
import { IEncrypter } from "../protocols/crypto/Encrypter";
import { IHashComparer } from "../protocols/crypto/HashComparer";
import { IHasher } from "../protocols/crypto/Hasher";
import { ICreateAccountRepository } from "../protocols/db/account/CreateUserRepository";
import { ILoadUserByEmailRepository } from "../protocols/db/account/LoadUserByEmailRepository";

export const mockCreateUserRepository = (): ICreateAccountRepository => {
  class CreateUserRepositoryStub implements ICreateAccountRepository {
    async create(): Promise<UserModel> {
      return mockUserModel();
    }
  }

  return new CreateUserRepositoryStub();
};

export const mockLoadUserByEmailRepository = (): ILoadUserByEmailRepository => {
  class LoadUserByEmailRepositoryStub implements ILoadUserByEmailRepository {
    async loadByEmail(): Promise<UserModel | null> {
      return mockUserModel();
    }
  }

  return new LoadUserByEmailRepositoryStub();
};

export const mockHashComparer = (): IHashComparer => {
  class HashComparerStub implements IHashComparer {
    async compare(): Promise<boolean> {
      return true;
    }
  }

  return new HashComparerStub();
};

export const mockHasher = (): IHasher => {
  class HasherStub implements IHasher {
    async generate(value: string): Promise<string> {
      return value;
    }
  }

  return new HasherStub();
};

export const mockEncrypter = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    async encrypt(): Promise<string> {
      return "encryptedvalue";
    }
  }

  return new EncrypterStub();
};

export const mockDecrypter = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    async decrypt(): Promise<any> {
      return { userId: 1 };
    }
  }

  return new DecrypterStub();
};
