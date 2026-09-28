import { IAccessRecordRepository } from "../../domain/ports/IAccessRecord.repository";

export type VehicleStatus = {
    plate: string;
    isInside: boolean;
    entryDateTime: Date | null;
    exitDateTime: Date | null;
};

export class GetVehicleStatusUseCase {
    constructor(private readonly accessRecordRepository: IAccessRecordRepository) {}

    async execute(plate: string): Promise<VehicleStatus> {
        const normalizedPlate = plate.trim();
        const record = await this.accessRecordRepository.getLatestRecordByPlate(normalizedPlate);

        if (!record) {
            return { plate: normalizedPlate, isInside: false, entryDateTime: null, exitDateTime: null };
        }

        return {
            plate: normalizedPlate,
            isInside: record.isCurrentlyInside(),
            entryDateTime: record.entryDateTime,   // ajusta a los nombres reales de tu dominio
            exitDateTime: record.exitDateTime ?? null,
        };
    }
}