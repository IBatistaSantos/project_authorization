import { IHashComparer } from "@/data/protocols/crypto/HashComparer";
import { IHasher } from "@/data/protocols/crypto/Hasher";
import { hash, compare } from "bcryptjs";

class BcryptAdapter implements IHasher, IHashComparer {
  constructor(private readonly salt: number) {}
  async generate(value: string): Promise<string> {
    const hashedValue = await hash(value, this.salt);
    return hashedValue;
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const match = await compare(value, hash);

    return match;
  }
}

export { BcryptAdapter };
