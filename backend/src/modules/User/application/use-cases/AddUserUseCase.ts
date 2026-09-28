import { IUserRepository } from "../../domain/ports/IUser.repository";
import { User } from "../../domain/entities/User";

export const STUDENT_ROLE_ID = 1;

export type CreateUserProfileData = {
  id: string;
  name: string;
  email: string;
};

export class AddUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: CreateUserProfileData): Promise<User> {
    const user = new User(data.id, data.name, data.email, STUDENT_ROLE_ID, []);
    return this.userRepository.addUser(user);
  }
}