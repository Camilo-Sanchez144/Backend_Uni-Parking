import { Request, Response } from "express";
import { AuthorizeVisitor } from "../../application/use-cases/AuthorizeVisitor";
import { CreateVisitor } from "../../application/use-cases/CreateVisitor";
import { GetAllVisitors } from "../../application/use-cases/GetAllVisitors";
import { GetVisitor } from "../../application/use-cases/GetVisitor";
import { RegisterVisitorExit } from "../../application/use-cases/RegisterVisitorExit";
import { validateCreateVisitor, validateVisitorId } from "../validations/VisitorValidation";

export class VisitorController {
    constructor(
        private readonly createVisitor: CreateVisitor,
        private readonly getVisitor: GetVisitor,
        private readonly getAllVisitors: GetAllVisitors,
        private readonly authorizeVisitor: AuthorizeVisitor,
        private readonly registerVisitorExit: RegisterVisitorExit
    ) {}

    create = async (req: Request, res: Response) => {
        try {
            const { error, value } = validateCreateVisitor(req.body);

            if (error) {
                res.status(400).json({ mensaje: 'Error en la validación', detail: error.details });
                return;
            }

            const visitor = await this.createVisitor.execute(value);
            res.status(201).json(visitor);
        } catch (err) {
            this.internalError(res, err);
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const visitors = await this.getAllVisitors.execute();
            res.status(200).json(visitors);
        } catch (err) {
            this.internalError(res, err);
        }
    }

    findById = async (req: Request, res: Response) => {
        try {
            const { error, value: id } = validateVisitorId(String(req.params.id));

            if (error) {
                res.status(400).json({ mensaje: 'El id del visitante no es válido' });
                return;
            }

            const visitor = await this.getVisitor.execute(id);
            if (!visitor) {
                res.status(404).json({ message: "Visitante no encontrado" });
                return;
            }
            res.status(200).json(visitor);
        } catch (err) {
            this.internalError(res, err);
        }
    }

    authorize = async (req: Request, res: Response) => {
        try {
            const { error, value: id } = validateVisitorId(String(req.params.id));

            if (error) {
                res.status(400).json({ mensaje: 'El id del visitante no es válido' });
                return;
            }

            const visitor = await this.authorizeVisitor.execute(id);
            if (!visitor) {
                res.status(404).json({ message: "Visitante no encontrado" });
                return;
            }
            res.status(200).json(visitor);
        } catch (err) {
            this.internalError(res, err);
        }
    }

    exit = async (req: Request, res: Response) => {
        try {
            const { error, value: id } = validateVisitorId(String(req.params.id));

            if (error) {
                res.status(400).json({ mensaje: 'El id del visitante no es válido' });
                return;
            }

            const visitor = await this.registerVisitorExit.execute(id);
            if (!visitor) {
                res.status(404).json({ message: "Visitante no encontrado" });
                return;
            }
            res.status(200).json(visitor);
        } catch (err) {
            this.internalError(res, err);
        }
    }

    // El detalle del error se queda en el servidor: este endpoint es público y el mensaje de
    // Postgres podría revelar nombres de tablas o columnas.
    private internalError(res: Response, err: unknown) {
        console.error("Error en el módulo de visitantes:", err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}
