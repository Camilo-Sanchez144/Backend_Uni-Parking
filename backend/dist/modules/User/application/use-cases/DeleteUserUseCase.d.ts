import { IUserRepository } from "../../domain/ports/IUser.repository";
export declare class DeleteUserUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(id: string): Promise<boolean>;
}
//# sourceMappingURL=DeleteUserUseCase.d.ts.map