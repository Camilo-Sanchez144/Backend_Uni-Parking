import { User } from "../../../User/domain/entities/User";
import { UserEntity } from "../../../User/infraestructure/persistence/User.Entity";

export class Vehicle{
    constructor(
      public readonly plate: string,
      public readonly brand: string,
      public readonly model: number,
      public readonly color: string,
      public readonly type: string,
      public is_authorized: boolean,
      public readonly owner: UserEntity,
  ) {}
}