import { IUserRepository } from "../../domain/ports/IUser.repository";
import { User } from "../../domain/entities/User";
import { getFirebaseAuth } from "../../../../shared/config/firebase";

export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id:string): Promise<boolean> {
    const user = await this.userRepository.deleteUser(id);
    const userFirebase = await getFirebaseAuth().updateUser(id, { disabled: true });
    if(!user || !userFirebase){
      return false;
    }
    return true;
  }
}