import { IUserRepository } from "../../domain/ports/IUser.repository";
import { User } from "../../domain/entities/User";
export declare class GetUserByIdUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(id: string): Promise<User | null>;
}
//# sourceMappingURL=GetUserByIdUseCase.d.ts.map