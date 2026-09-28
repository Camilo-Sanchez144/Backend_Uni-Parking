import { AccessRecordRepository } from "../../infraestructure/adapters/AccessRecord.repository";

export class GetStatusVehicleUseCase{
    
    constructor(private readonly accessRecordRepository: AccessRecordRepository){}

    async execute(plate: string): Promise<boolean> {
        return await this.accessRecordRepository.getStatusVehicle(plate);
    }
}