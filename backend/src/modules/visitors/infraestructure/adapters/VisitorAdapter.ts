import { DataSource, Repository } from "typeorm";
import { Visitor, DocumentType } from "../../domain/entities/Visitor";
import { VisitorPort } from "../../domain/ports/VisitorPort";
import { Vehicle } from "../../../Vehicle/domain/entities/Vehicle";
import { VehicleEntity } from "../../../Vehicle/infraestructure/persistence/Vehicles.Entity";
import { toVehicleDomain, toVehicleEntity } from "../../../Vehicle/infraestructure/adapters/Vehicle.mapper";
import { VisitorModel } from "../persistence/VisitorModel";

export class VisitorAdapter implements VisitorPort{

    constructor(private readonly dataSource: DataSource){}

    async register(visitor: Visitor): Promise<Visitor> {
        return this.dataSource.transaction(async (manager) => {
            const vehicle = await this.saveVehicle(manager.getRepository(VehicleEntity), visitor.vehicle);
            await manager.getRepository(VisitorModel).save(this.toModel(visitor, vehicle.id_vehicle));
            return new Visitor(
                visitor.id,
                visitor.first_name,
                visitor.last_name,
                visitor.document_type,
                visitor.document_number,
                visitor.reason,
                visitor.is_authorized,
                toVehicleDomain(vehicle),
                visitor.created_at,
                visitor.exited_at
            );
        });
    }
    async findById(id: string): Promise<Visitor | null> {
        const model = await this.dataSource.getRepository(VisitorModel).findOne({where:{id_visitor:id}, relations:{vehicle:true}});
        if(!model) return null;
        return this.toDomain(model);
    }
    async findAll(): Promise<Visitor[]> {
        const models = await this.dataSource.getRepository(VisitorModel).find({relations:{vehicle:true}, order:{created_at_visitor:'DESC'}});
        return models.map((model)=>this.toDomain(model));
    }
    async authorize(id: string): Promise<Visitor | null> {
        const result = await this.dataSource.getRepository(VisitorModel).update({id_visitor:id}, {is_authorized_visitor:true});
        if(!result.affected) return null;
        return this.findById(id);
    }
    async registerExit(id: string): Promise<Visitor | null> {
        const result = await this.dataSource.getRepository(VisitorModel).update({id_visitor:id}, {exited_at_visitor: new Date()});
        if(!result.affected) return null;
        return this.findById(id);
    }

    private async saveVehicle(vehicles: Repository<VehicleEntity>, vehicle: Vehicle): Promise<VehicleEntity> {
        const entity = toVehicleEntity(vehicle);
        // Sin placa (scooter, bicicleta) cada registro es un vehículo nuevo.
        if(!entity.plate_vehicle) return vehicles.save(entity);
        // La placa identifica al vehículo: si la moto ya existe (otra visita, o un usuario de la
        // universidad) se reutiliza. ON CONFLICT DO NOTHING evita el choque entre dos registros
        // simultáneos con la misma placa.
        await vehicles.createQueryBuilder().insert().values(entity).orIgnore().execute();
        return vehicles.findOneByOrFail({plate_vehicle:entity.plate_vehicle});
    }

    private toDomain(model: VisitorModel): Visitor {
        return new Visitor(
        model.id_visitor,
        model.first_name_visitor,
        model.last_name_visitor,
        model.document_type_visitor as DocumentType,
        model.document_number_visitor,
        model.reason_visitor,
        model.is_authorized_visitor,
        toVehicleDomain(model.vehicle),
        model.created_at_visitor,
        model.exited_at_visitor
        );
    }

    private toModel(visitor: Visitor, idVehicle: string): VisitorModel {
        const model = new VisitorModel();
        model.id_visitor = visitor.id;
        model.first_name_visitor = visitor.first_name;
        model.last_name_visitor = visitor.last_name;
        model.document_type_visitor = visitor.document_type;
        model.document_number_visitor = visitor.document_number;
        model.reason_visitor = visitor.reason;
        model.is_authorized_visitor = visitor.is_authorized;
        model.id_vehicle_visitor = idVehicle;
        model.created_at_visitor = visitor.created_at;
        return model;
    }

}
