import * as joi from 'joi';

export type CreateVehicleData = {
  plate: string;
  brand: string;
  model: number;
  color: string;
  type: string;
  id_owner: number;
};

type ValidationResult = {
  error: joi.ValidationError | undefined;
  value: CreateVehicleData;
};

export function validateCreateVehicle(data: any): ValidationResult {
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