import * as joi from 'joi';

import { UserEntity } from '../../../User/infraestructure/persistence/User.Entity';
import { UUID } from 'crypto';

export type CreateVehicleData = {
  plate?:string | UUID;
  brand: string;
  model: number;
  color: string;
  type: string;
  owner: UserEntity;
};

type ValidationResult = {
  error: joi.ValidationError | undefined;
  value: CreateVehicleData;
};

export const vehicleDataSchema = joi.object({

  plate: joi.string()
    .messages({
      'string.empty': 'La placa es obligatoria',
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

  owner: joi.string()
    .required()
    .messages({
      'string.empty': 'El propietario es obligatorio',
      'any.required': 'El propietario es un campo requerido',
    }),
});


export function validateCreateVehicle(data: any): ValidationResult {
  return vehicleDataSchema.validate(data);
}