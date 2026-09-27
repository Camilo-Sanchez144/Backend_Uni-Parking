import { IUserRepository } from "../../domain/ports/IUser.repository";
export declare class RestoreUserUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(id: string): Promise<boolean>;
}
//# sourceMappingURL=RestoreUserUseCase.d.ts.map