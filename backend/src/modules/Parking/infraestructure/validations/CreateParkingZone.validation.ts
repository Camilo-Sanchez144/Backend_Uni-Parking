import * as joi from 'joi';

export type CreateParkingZoneData = {
  vehicleType: string;
  totalCapacity: number;
  availableSpaces: number;
};

export type UpdateParkingZoneData = Partial<Omit<CreateParkingZoneData, 'vehicleType'>>;

type ValidationResult<T> = {
  error: joi.ValidationError | undefined;
  value: T;
};

const createParkingZoneSchema = joi.object({
  vehicleType: joi.string()
    .trim()
    .min(2)
    .pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúñÑ]+)?$/)
    .required()
    .messages({
      'string.pattern.base': 'El tipo de vehículo solo puede contener letras',
      'string.empty': 'El tipo de vehículo es obligatorio',
      'string.min': 'El tipo de vehículo debe tener al menos 2 caracteres',
    }),

  totalCapacity: joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.base': 'La capacidad total debe ser un número',
      'number.integer': 'La capacidad total debe ser un número entero',
      'number.min': 'La capacidad total debe ser al menos 1',
      'any.required': 'La capacidad total es un campo requerido',
    }),

  availableSpaces: joi.number()
    .integer()
    .min(0)
    .max(joi.ref('totalCapacity'))
    .required()
    .messages({
      'number.base': 'Los espacios disponibles deben ser un número',
      'number.integer': 'Los espacios disponibles deben ser un número entero',
      'number.min': 'Los espacios disponibles no pueden ser negativos',
      'number.max': 'Los espacios disponibles no pueden superar la capacidad total',
      'any.required': 'Los espacios disponibles son un campo requerido',
    }),
});

const updateParkingZoneSchema = joi.object({
  totalCapacity: joi.number()
    .integer()
    .min(1)
    .messages({
      'number.base': 'La capacidad total debe ser un número',
      'number.integer': 'La capacidad total debe ser un número entero',
      'number.min': 'La capacidad total debe ser al menos 1',
    }),

  availableSpaces: joi.number()
    .integer()
    .min(0)
    .messages({
      'number.base': 'Los espacios disponibles deben ser un número',
      'number.integer': 'Los espacios disponibles deben ser un número entero',
      'number.min': 'Los espacios disponibles no pueden ser negativos',
    }),
}).min(1);

export function validateCreateParkingZone(data: any): ValidationResult<CreateParkingZoneData> {
  return createParkingZoneSchema.validate(data);
}

export function validateUpdateParkingZone(data: any): ValidationResult<UpdateParkingZoneData> {
  return updateParkingZoneSchema.validate(data);
}