import * as joi from 'joi';
import { VehicleData } from '../../domain/entities/Vehicle';

// La universidad solo tiene parqueadero para vehículos de dos ruedas.
export const VEHICLE_TYPES = ['moto', 'scooter', 'bicicleta'] as const;

/** Placa de moto: tres letras, dos dígitos y una letra final (opcional en las más antiguas). */
const PLATE_PATTERN = /^[A-Z]{3}[0-9]{2}[A-Z]?$/;

/** Serial del marco de una bicicleta: letras, números y guiones. */
const FRAME_SERIAL_PATTERN = /^[A-Z0-9-]{4,30}$/;

export type CreateVehicleData = VehicleData & {
  id_owner: number;
};

type ValidationResult = {
  error: joi.ValidationError | undefined;
  value: CreateVehicleData;
};

/**
 * Qué datos pide cada tipo de vehículo (misma regla que el formulario del front):
 * - moto: placa obligatoria.
 * - scooter: marca opcional; sin placa.
 * - bicicleta: serial del marco opcional; sin placa.
 * El color es obligatorio en los tres.
 */
export const vehicleDataKeys = {
  type: joi.string()
    .trim()
    .valid(...VEHICLE_TYPES)
    .required()
    .messages({
      'any.only': 'El tipo de vehículo debe ser moto, scooter o bicicleta',
      'string.empty': 'El tipo de vehículo es obligatorio',
      'any.required': 'El tipo de vehículo es un campo requerido',
    }),

  plate: joi.string()
    .trim()
    .uppercase()
    .pattern(PLATE_PATTERN)
    .when('type', { is: 'moto', then: joi.required(), otherwise: joi.forbidden() })
    .messages({
      'string.pattern.base': 'La placa de moto debe tener el formato ABC12D (3 letras, 2 números y 1 letra)',
      'string.empty': 'La placa es obligatoria',
      'any.required': 'La placa es un campo requerido para las motos',
      'any.unknown': 'Solo las motos llevan placa',
    }),

  brand: joi.string()
    .trim()
    .min(2)
    .max(30)
    .pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúñÑ]+)?$/)
    .when('type', { is: 'scooter', then: joi.optional(), otherwise: joi.required() })
    .messages({
      'string.pattern.base': 'La marca solo puede contener letras',
      'string.empty': 'La marca es obligatoria',
      'string.min': 'La marca debe tener al menos 2 caracteres',
      'string.max': 'La marca no puede superar los 30 caracteres',
      'any.required': 'La marca es un campo requerido',
    }),

  model: joi.number()
    .integer()
    .messages({
      'number.base': 'El modelo debe ser un número',
      'number.integer': 'El modelo debe ser un año, sin decimales',
    }),

  color: joi.string()
    .trim()
    .min(3)
    .max(20)
    .pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/)
    .required()
    .messages({
      'string.pattern.base': 'El color solo puede contener letras',
      'string.empty': 'El color es obligatorio',
      'string.max': 'El color no puede superar los 20 caracteres',
      'any.required': 'El color es un campo requerido',
    }),

  frame_serial: joi.string()
    .trim()
    .uppercase()
    .pattern(FRAME_SERIAL_PATTERN)
    .when('type', { is: 'bicicleta', then: joi.optional(), otherwise: joi.forbidden() })
    .messages({
      'string.pattern.base': 'El serial solo puede tener letras, números y guiones (4 a 30 caracteres)',
      'any.unknown': 'Solo las bicicletas llevan serial de marco',
    }),
};

export const vehicleDataSchema = joi.object(vehicleDataKeys);

const createVehicleSchema = vehicleDataSchema.keys({
  id_owner: joi.number()
    .required()
    .messages({
      'number.base': 'El propietario debe ser un número',
      'any.required': 'El propietario es un campo requerido',
    }),
});

export function validateCreateVehicle(data: any): ValidationResult {
  return createVehicleSchema.validate(data);
}
