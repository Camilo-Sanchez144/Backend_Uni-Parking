import * as joi from 'joi';
import { CreateIncidentData } from './CreateIncident.validation';

export type UpdateIncidentData = Partial<Omit<CreateIncidentData, 'id_usuario'>> & {
    id_usuario?: string;
};

type ValidationResult = {
    error: joi.ValidationError | undefined;
    value: UpdateIncidentData;
};

export function validateUpdateIncident(data: any): ValidationResult {

    const updateSchema = joi.object({

        fecha_hora: joi.date()
            .iso()
            .messages({
                'date.base': 'La fecha y hora debe ser válida',
                'date.format': 'La fecha y hora debe tener un formato válido',
            }),

        tipo: joi.string()
            .trim()
            .min(3)
            .max(100)
            .messages({
                'string.empty': 'El tipo de incidencia no puede estar vacío',
                'string.min': 'El tipo de incidencia debe tener al menos 3 caracteres',
                'string.max': 'El tipo de incidencia no puede superar los 100 caracteres',
            }),

        descripcion: joi.string()
            .trim()
            .min(5)
            .max(500)
            .messages({
                'string.empty': 'La descripción no puede estar vacía',
                'string.min': 'La descripción debe tener al menos 5 caracteres',
                'string.max': 'La descripción no puede superar los 500 caracteres',
            }),

        estado: joi.string()
            .trim()
            .max(50)
            .messages({
                'string.empty': 'El estado no puede estar vacío',
                'string.max': 'El estado no puede superar los 50 caracteres',
            }),

        id_usuario: joi.string()
            .guid({ version: ['uuidv4', 'uuidv5'] })
            .messages({
                'string.guid': 'El ID del usuario debe ser un UUID válido',
            }),

    }).min(1);

    return updateSchema.validate(data);
}