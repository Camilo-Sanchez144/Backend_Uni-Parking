export class ParkingZone {
    constructor(
        public id: number,
        public vehicleType: string,
        public totalCapacity: number,
        public availableSpaces: number
    ) {}

    hasAvailability(): boolean {
        return this.availableSpaces > 0;
    }
    occupySpace(): void {
        if (!this.hasAvailability()) {
            throw new Error("No hay espacios disponibles");
        }
        this.availableSpaces--;
    }
    releaseSpace(): void {
        if (this.availableSpaces >= this.totalCapacity) {
            throw new Error("No se pueden liberar más espacios");
        }
        this.availableSpaces++;
    }
}