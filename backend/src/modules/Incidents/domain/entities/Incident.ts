export class Incident {
    constructor(
        public readonly fecha_hora: string,
        public readonly tipo: string,
        public readonly descripcion: string,
        public readonly estado: string,
        public readonly id_usuario: string
    ) {}
}