"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateIncident = validateCreateIncident;
const joi = __importStar(require("joi"));
function validateCreateIncident(data) {
    const incidentSchema = joi.object({
        fecha_hora: joi.date()
            .iso()
            .required()
            .messages({
            'date.base': 'La fecha y hora debe ser válida',
            'date.format': 'La fecha y hora debe tener un formato válido',
            'any.required': 'La fecha y hora es un campo requerido',
        }),
        tipo: joi.string()
            .trim()
            .min(3)
            .max(100)
            .required()
            .messages({
            'string.empty': 'El tipo de incidencia es obligatorio',
            'string.min': 'El tipo de incidencia debe tener al menos 3 caracteres',
            'string.max': 'El tipo de incidencia no puede superar los 100 caracteres',
            'any.required': 'El tipo de incidencia es un campo requerido',
        }),
        descripcion: joi.string()
            .trim()
            .min(5)
            .max(500)
            .required()
            .messages({
            'string.empty': 'La descripción es obligatoria',
            'string.min': 'La descripción debe tener al menos 5 caracteres',
            'string.max': 'La descripción no puede superar los 500 caracteres',
            'any.required': 'La descripción es un campo requerido',
        }),
        estado: joi.string()
            .trim()
            .max(50)
            .required()
            .messages({
            'string.empty': 'El estado es obligatorio',
            'string.max': 'El estado no puede superar los 50 caracteres',
            'any.required': 'El estado es un campo requerido',
        }),
        id_usuario: joi.string()
            .guid({ version: ['uuidv4', 'uuidv5'] })
            .required()
            .messages({
            'string.guid': 'El ID del usuario debe ser un UUID válido',
            'string.empty': 'El ID del usuario es obligatorio',
            'any.required': 'El ID del usuario es un campo requerido',
        }),
    });
    return incidentSchema.validate(data);
}
//# sourceMappingURL=CreateIncident.validation.js.map