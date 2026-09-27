import { VehicleEntity } from './../../../Vehicle/infraestructure/persistence/Vehicles.Entity';
import { Vehicle } from './../../../Vehicle/domain/entities/Vehicle';
export class User{
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly roleId: number,
        public readonly vehicles: Vehicle[],
        public status_user = true
    ) {}
}