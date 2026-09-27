import { IUserRepository } from "../../domain/ports/IUser.repository";
import { User } from "../../domain/entities/User";
import { getFirebaseAuth } from "../../../../shared/config/firebase";

export class RestoreUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id:string): Promise<boolean> {
    const user = await this.userRepository.restoreUser(id);
    if(!user) return false;
    return true;
  }
}