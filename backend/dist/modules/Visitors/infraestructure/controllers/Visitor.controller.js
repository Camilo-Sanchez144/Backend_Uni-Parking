"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitorController = void 0;
const Visitor_validation_1 = require("../validations/Visitor.validation");
class VisitorController {
    constructor(createVisitor, getVisitor, getAllVisitors, registerVisitorExit) {
        this.createVisitor = createVisitor;
        this.getVisitor = getVisitor;
        this.getAllVisitors = getAllVisitors;
        this.registerVisitorExit = registerVisitorExit;
        this.create = async (req, res) => {
            try {
                const { error, value } = (0, Visitor_validation_1.validateCreateVisitor)(req.body);
                if (error) {
                    res.status(400).json({ mensaje: 'Error en la validación', detail: error.details });
                    return;
                }
                const visitor = await this.createVisitor.execute(value);
                res.status(201).json(visitor);
            }
            catch (err) {
                this.internalError(res, err);
            }
        };
        this.findAll = async (req, res) => {
            try {
                const visitors = await this.getAllVisitors.execute();
                res.status(200).json(visitors);
            }
            catch (err) {
                this.internalError(res, err);
            }
        };
        this.findById = async (req, res) => {
            try {
                const { error, value: id } = (0, Visitor_validation_1.validateVisitorId)(String(req.params.id));
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
            }
            catch (err) {
                this.internalError(res, err);
            }
        };
        this.exit = async (req, res) => {
            try {
                const { error, value: id } = (0, Visitor_validation_1.validateVisitorId)(String(req.params.id));
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
            }
            catch (err) {
                this.internalError(res, err);
            }
        };
    }
    // El detalle del error se queda en el servidor: este endpoint es público y el mensaje de
    // Postgres podría revelar nombres de tablas o columnas.
    internalError(res, err) {
        console.error("Error en el módulo de visitantes:", err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}
exports.VisitorController = VisitorController;
//# sourceMappingURL=Visitor.controller.js.map