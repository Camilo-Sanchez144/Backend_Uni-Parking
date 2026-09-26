import { IUserRepository } from "../../domain/ports/IUser.repository";
export declare class GetAllUsersUnactiveUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(): Promise<void>;
}
//# sourceMappingURL=GetAllUsersUnactiveUseCase.d.ts.map