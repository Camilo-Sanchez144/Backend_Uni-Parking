import { IAccessRecordRepository, OpenAccessRecordsCount } from "../../domain/ports/IAccessRecord.repository";

/**
 * Cuántos vehículos están dentro ahora, sin las placas: la versión de
 * `GetOpenAccessRecordsUseCase` que puede usar cualquier cuenta, no solo
 * vigilancia y administración (PEN-030).
 */
export class GetOpenAccessRecordsCountUseCase {

    constructor(
        private readonly accessRecordRepository: IAccessRecordRepository
    ) {}

    async execute(): Promise<OpenAccessRecordsCount> {
        return this.accessRecordRepository.countOpenRecords();
    }
}
