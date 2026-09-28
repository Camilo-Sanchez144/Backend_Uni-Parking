import * as joi from 'joi';
import { UUID } from 'crypto';
import { brandSchema, colorSchema, detailOnCreate } from '../../../../shared/validations/vehicleDetails.validation';

export type CreateVehicleData = {
  plate?:string | UUID;
  brand: string;
  model: number;
  color: string;
  type: string;
  owner: string;
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

  // Bicicleta y scooter pueden dejar marca y color vacíos (ver shared/validations/vehicleDetails.validation.ts).
  brand: detailOnCreate(brandSchema()),

  model: joi.number()
    .required()
    .messages({
      'number.base': 'El modelo debe ser un número',
      'any.required': 'El modelo es un campo requerido',
    }),

  color: detailOnCreate(colorSchema()),

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