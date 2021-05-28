import { IDecrypter } from "@/data/protocols/crypto/Decrypter";
import { IEncrypter } from "@/data/protocols/crypto/Encrypter";
import jwt from "jsonwebtoken";

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    const token = jwt.sign({ userId: value }, this.secret);

    return token;
  }

  async decrypt(value: string): Promise<any> {
    try {
      const payload = jwt.verify(value, this.secret);

      return payload;
    } catch (error) {
      return null;
    }
  }
}
