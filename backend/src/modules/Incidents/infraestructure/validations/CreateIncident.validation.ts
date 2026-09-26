import * as joi from 'joi';

export type CreateIncidentData = {
    fecha_hora: string;
    tipo: string;
    descripcion: string;
    estado: string;
    id_usuario: string;
};

type ValidationResult = {
    error: joi.ValidationError | undefined;
    value: CreateIncidentData;
};

export function validateCreateIncident(data: any): ValidationResult {

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
            .required()
            .messages({
                'string.empty': 'El ID del usuario es obligatorio',
                'any.required': 'El ID del usuario es un campo requerido',
            }),

    });

    return incidentSchema.validate(data);
}