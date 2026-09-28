import { AccessRecord } from "../../domain/entities/AccessRecord";
import { IAccessRecordRepository } from "../../domain/ports/IAccessRecord.repository";

export class GetOpenAccessRecordsUseCase {

    constructor(
        private readonly accessRecordRepository: IAccessRecordRepository
    ) {}

    async execute(): Promise<AccessRecord[]> {
        return this.accessRecordRepository.findOpenRecords();
    }
}
