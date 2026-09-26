import { IUserRepository } from "../../domain/ports/IUser.repository";
import { User } from "../../domain/entities/User";

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }
}