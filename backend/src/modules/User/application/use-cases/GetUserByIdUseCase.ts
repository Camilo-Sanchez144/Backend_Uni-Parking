import { IUserRepository } from "../../domain/ports/IUser.repository";
import { User } from "../../domain/entities/User";

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id:string): Promise<User | null> {
    return this.userRepository.getUserById(id);
  }
}