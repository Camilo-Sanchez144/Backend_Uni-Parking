import { IUserRepository } from "../../domain/ports/IUser.repository";
import { User } from "../../domain/entities/User";
export type CreateUserProfileData = {
    id: string;
    name: string;
    email: string;
    roleId: number;
};
export declare class AddUserUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(data: CreateUserProfileData): Promise<User>;
}
//# sourceMappingURL=AddUserUseCase.d.ts.map