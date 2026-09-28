import { User } from "../../../User/domain/entities/User";

export class Vehicle{
    constructor(
      public readonly plate: string,
      public readonly brand: string,
      public readonly model: number,
      public readonly color: string,
      public readonly type: string,
      public is_authorized: boolean,
      public readonly id_owner: string, 
      public readonly owner?: User, 
  ) {}
}