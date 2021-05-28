import { UserModel } from "@/domain/models/User";
import { mockUserModel } from "@/domain/test";

import { IDecrypter } from "../protocols/crypto/Decrypter";
import { IEncrypter } from "../protocols/crypto/Encrypter";
import { IHashComparer } from "../protocols/crypto/HashComparer";
import { IHasher } from "../protocols/crypto/Hasher";
import { IUserRepository } from "../protocols/db/account/UserRepository";

export const mockUserRepository = (): IUserRepository => {
  class CreateUserRepositoryStub implements IUserRepository {
    async loadByEmail(): Promise<UserModel | null> {
      return mockUserModel();
    }
    async create(): Promise<UserModel> {
      return mockUserModel();
    }
  }

  return new CreateUserRepositoryStub();
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
