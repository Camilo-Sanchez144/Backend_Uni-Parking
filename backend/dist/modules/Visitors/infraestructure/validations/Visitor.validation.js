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
exports.validateCreateVisitor = validateCreateVisitor;
exports.validateVisitorId = validateVisitorId;
const joi = __importStar(require("joi"));
const Visitor_1 = require("../../domain/entities/Visitor");
const CreateVehicle_validation_1 = require("./../../../Vehicle/infraestructure/validations/CreateVehicle.validation");
// Mismas reglas que el formulario del front, para que lo que pasa allá no falle acá.
const NAME_PATTERN = /^[\p{L}][\p{L}\s'.-]*$/u;
const DOCUMENT_NUMBER_PATTERN = /^\d{6,11}$/;
const nameField = (label) => joi.string()
    .trim()
    .min(2)
    .max(40)
    .pattern(NAME_PATTERN)
    .required()
    .messages({
    'string.pattern.base': `El ${label} solo puede contener letras`,
    'string.empty': `El ${label} es obligatorio`,
    'string.min': `El ${label} debe tener al menos 2 caracteres`,
    'string.max': `El ${label} no puede superar los 40 caracteres`,
    'any.required': `El ${label} es un campo requerido`,
});
const visitorSchema = joi.object({
    first_name: nameField('nombre'),
    last_name: nameField('apellido'),
    document_type: joi.string()
        .valid(...Visitor_1.DOCUMENT_TYPES)
        .required()
        .messages({
        'any.only': 'El tipo de documento debe ser CC (cédula) o TI (tarjeta de identidad)',
        'string.empty': 'El tipo de documento es obligatorio',
        'any.required': 'El tipo de documento es un campo requerido',
    }),
    document_number: joi.string()
        .trim()
        .pattern(DOCUMENT_NUMBER_PATTERN)
        .required()
        .messages({
        'string.pattern.base': 'El número de documento debe tener entre 6 y 11 dígitos, sin puntos ni espacios',
        'string.empty': 'El número de documento es obligatorio',
        'any.required': 'El número de documento es un campo requerido',
    }),
    reason: joi.string()
        .trim()
        .min(5)
        .max(160)
        .required()
        .messages({
        'string.empty': 'El motivo de la visita es obligatorio',
        'string.min': 'El motivo debe tener al menos 5 caracteres',
        'string.max': 'El motivo no puede superar los 160 caracteres',
        'any.required': 'El motivo de la visita es un campo requerido',
    }),
    vehicle: CreateVehicle_validation_1.vehicleDataSchema
        .required()
        .messages({
        'any.required': 'El vehículo es un campo requerido',
    }),
}).required();
function validateCreateVisitor(data) {
    // abortEarly: false devuelve todos los errores juntos, para pintarlos de una vez en el formulario.
    return visitorSchema.validate(data, { abortEarly: false });
}
/** Un id que no sea UUID nunca existe; sin esto, Postgres lo rechaza con un error y saldría un 500. */
function validateVisitorId(id) {
    return joi.string().uuid().required().validate(id);
}
//# sourceMappingURL=Visitor.validation.js.map