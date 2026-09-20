import * as joi from 'joi';
import { CreateVehicleData } from './CreateVehicle.validation';

export type UpdateVehicleData = Partial<Omit<CreateVehicleData, 'plate' | 'id_owner'>>;

type ValidationResult = {
  error: joi.ValidationError | undefined;
  value: UpdateVehicleData;
};

export function validateUpdateVehicle(data: any): ValidationResult {
  const updateSchema = joi.object({
    brand: joi.string()
      .trim()
      .min(2)
      .pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúñÑ]+)?$/)
      .messages({
        'string.pattern.base': 'La marca solo puede contener letras',
        'string.min': 'La marca debe tener al menos 2 caracteres',
      }),

    model: joi.number()
      .messages({
        'number.base': 'El modelo debe ser un número',
      }),

    color: joi.string()
      .trim()
      .min(3)
      .pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/)
      .messages({
        'string.pattern.base': 'El color solo puede contener letras',
      }),

    type: joi.string()
      .trim()
      .messages({
        'string.empty': 'El tipo no puede estar vacío',
      }),
  }).min(1);

  return updateSchema.validate(data);
}