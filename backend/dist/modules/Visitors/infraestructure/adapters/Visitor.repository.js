"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitorAdapter = void 0;
const Visitor_1 = require("../../domain/entities/Visitor");
const mapperVehicle_1 = require("../../../../shared/utils/mapperVehicle");
const Visitor_Entity_1 = require("../persistence/Visitor.Entity");
class VisitorAdapter {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async register(visitor) {
        const entity = this.toEntity(visitor);
        const saved = await this.dataSource.getRepository(Visitor_Entity_1.VisitorEntity).save(entity);
        return this.toDomain(saved);
    }
    async findById(id) {
        const model = await this.dataSource.getRepository(Visitor_Entity_1.VisitorEntity).findOne({ where: { id_visitor: id } });
        if (!model)
            return null;
        return this.toDomain(model);
    }
    async findAll() {
        const models = await this.dataSource.getRepository(Visitor_Entity_1.VisitorEntity).find();
        return models.map((model) => this.toDomain(model));
    }
    async registerExit(id) {
        const result = await this.dataSource.getRepository(Visitor_Entity_1.VisitorEntity).update({ id_visitor: id }, { exited_at_visitor: new Date() });
        if (!result.affected)
            return null;
        return this.findById(id);
    }
    async saveVehicle(vehicles, vehicle) {
        const entity = (0, mapperVehicle_1.toVehicleEntity)(vehicle);
        // Sin placa (scooter, bicicleta) cada registro es un vehículo nuevo.
        if (!entity.plate_vehicle)
            return vehicles.save(entity);
        // La placa identifica al vehículo: si la moto ya existe (otra visita, o un usuario de la
        // universidad) se reutiliza. ON CONFLICT DO NOTHING evita el choque entre dos registros
        // simultáneos con la misma placa.
        await vehicles.createQueryBuilder().insert().values(entity).orIgnore().execute();
        return vehicles.findOneByOrFail({ plate_vehicle: entity.plate_vehicle });
    }
    toDomain(model) {
        return new Visitor_1.Visitor(model.id_visitor, model.first_name_visitor, model.last_name_visitor, model.document_type_visitor, model.document_number_visitor, model.reason_visitor, model.plate_vehicle_visitor, model.brand_vehicle, model.color_vehicle, model.type_vehicle, model.model_vehicle, model.created_at_visitor, model.exited_at_visitor);
    }
    toEntity(visitor) {
        const model = new Visitor_Entity_1.VisitorEntity();
        model.id_visitor = visitor.id;
        model.first_name_visitor = visitor.first_name;
        model.last_name_visitor = visitor.last_name;
        model.document_type_visitor = visitor.document_type;
        model.document_number_visitor = visitor.document_number;
        model.reason_visitor = visitor.reason;
        model.plate_vehicle_visitor = visitor.plate_vehicle_visitor;
        model.brand_vehicle = visitor.brand_vehicle;
        model.color_vehicle = visitor.color_vehicle;
        model.type_vehicle = visitor.type_vehicle;
        model.created_at_visitor = visitor.created_at;
        return model;
    }
}
exports.VisitorAdapter = VisitorAdapter;
//# sourceMappingURL=Visitor.repository.js.map