import { IUserRepository } from "../../domain/ports/IUser.repository";
import { User } from "../../domain/entities/User";
export declare class GetAllUsersUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(): Promise<User[]>;
}
//# sourceMappingURL=GetAllUsersUseCase.d.ts.map