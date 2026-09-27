import { IUserRepository } from "../../domain/ports/IUser.repository";
import { User } from "../../domain/entities/User";
import { getFirebaseAuth } from "../../../../shared/config/firebase";

export class GetAllUsersUnactiveUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<void> {
    await this.userRepository.getAllUserUnactive();
  }
}