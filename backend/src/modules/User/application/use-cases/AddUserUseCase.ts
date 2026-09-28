import { IUserRepository } from "../../domain/ports/IUser.repository";
import { User } from "../../domain/entities/User";
import { ROLE_IDS } from "../../../Role/domain/entities/Role";

/** Rol con el que empieza todo usuario nuevo: userEstandar (estudiantes, docentes y administrativos). */
export const STUDENT_ROLE_ID = ROLE_IDS.USER_ESTANDAR;

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