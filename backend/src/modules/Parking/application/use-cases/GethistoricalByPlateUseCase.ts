import { AccessRecordRepository } from './../../infraestructure/adapters/AccessRecord.repository';
import { AccessRecord } from "../../domain/entities/AccessRecord";

export class GethistoricalByPlateUseCase{

    constructor(private readonly accessRecordRepository: AccessRecordRepository){}

    async execute(plate:string): Promise<AccessRecord[]>{
        return await this.accessRecordRepository.gethistoricalByPlate(plate);
    }
}