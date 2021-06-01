import { IDecrypter } from "@/data/protocols/crypto/Decrypter";
import { ILoadUserIdByToken } from "@/domain/useCases/account/LoadUserIdByToken";

export class DecryptUserIdByToken implements ILoadUserIdByToken {
  constructor(private readonly decrypter: IDecrypter) {}

  async loadUserId(token: string): Promise<number | null> {
    const payload = await this.decrypter.decrypt(token);
    console.log(payload);
    return payload ? payload.userId : null;
  }
}
