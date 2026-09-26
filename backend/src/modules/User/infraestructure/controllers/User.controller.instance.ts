import { UserController } from './User.controller';
import { AppDataSource } from '../../../../shared/config/database';
import { UserRepository } from './../adapters/User.repository';
import { AddUserUseCase } from '../../application/use-cases/AddUserUseCase';
import { GetAllUsersUseCase } from '../../application/use-cases/GetAllUsersUseCase';
import { GetUserByIdUseCase } from '../../application/use-cases/GetUserByIdUseCase';
import { DeleteUserUseCase } from '../../application/use-cases/DeleteUserUseCase';
import { RestoreUserUseCase } from '../../application/use-cases/RestoreUserUseCase';
import { GetAllUsersUnactiveUseCase } from '../../application/use-cases/GetAllUsersUnactiveUseCase';

const userRepository = new UserRepository(AppDataSource);

const UserControllerInstance = new UserController(
    new AddUserUseCase(userRepository),
    new GetAllUsersUseCase(userRepository),
    new GetUserByIdUseCase(userRepository),
    new DeleteUserUseCase(userRepository),
    new RestoreUserUseCase(userRepository),
    new GetAllUsersUnactiveUseCase(userRepository)
);

export default UserControllerInstance