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
exports.validateCreateVehicle = validateCreateVehicle;
const joi = __importStar(require("joi"));
function validateCreateVehicle(data) {
    const vehicleSchema = joi.object({
        plate: joi.string()
            .trim()
            .pattern(/^[A-Z]{3}[0-9]{3}$/)
            .required()
            .messages({
            'string.pattern.base': 'La placa debe tener el formato ABC123 (3 letras y 3 números)',
            'string.empty': 'La placa es obligatoria',
            'any.required': 'La placa es un campo requerido',
        }),
        brand: joi.string()
            .trim()
            .min(2)
            .pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúñÑ]+)?$/)
            .required()
            .messages({
            'string.pattern.base': 'La marca solo puede contener letras',
            'string.empty': 'La marca es obligatoria',
            'string.min': 'La marca debe tener al menos 2 caracteres',
        }),
        model: joi.number()
            .required()
            .messages({
            'number.base': 'El modelo debe ser un número',
            'any.required': 'El modelo es un campo requerido',
        }),
        color: joi.string()
            .trim()
            .min(3)
            .pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/)
            .required()
            .messages({
            'string.pattern.base': 'El color solo puede contener letras',
            'string.empty': 'El color es obligatorio',
        }),
        type: joi.string()
            .trim()
            .required()
            .messages({
            'string.empty': 'El tipo de vehículo es obligatorio',
        }),
        id_owner: joi.number()
            .required()
            .messages({
            'string.empty': 'El propietario es obligatorio',
            'any.required': 'El propietario es un campo requerido',
        }),
    });
    return vehicleSchema.validate(data);
}
//# sourceMappingURL=CreateVehicle.validation.js.map