export class AccessRecord {

    constructor(
        public id: string | null,
        public plate: string | null,
        public visitorId: number | null,
        public zoneType: string,
        public entryDateTime: Date,
        public exitDateTime: Date | null
    ) {}

    isCurrentlyInside(): boolean {
        return this.exitDateTime === null;
    }

    registerExit(): void {

        if (!this.isCurrentlyInside()) {
            throw new Error("Este registro ya tiene una salida");
        }

        this.exitDateTime = new Date();
    }
}