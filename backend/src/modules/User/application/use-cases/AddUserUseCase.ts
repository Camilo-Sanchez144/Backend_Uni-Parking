import { IUserRepository } from "../../domain/ports/IUser.repository";
import { User } from "../../domain/entities/User";

export type CreateUserProfileData = {
  id: string;
  name: string;
  email: string;
  roleId: number;
};

export class AddUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: CreateUserProfileData): Promise<User> {
    const user = new User(data.id, data.name, data.email, data.roleId);
    return this.userRepository.addUser(user);
  }
}