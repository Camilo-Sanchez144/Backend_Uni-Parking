import { CreateVisitorDto } from '../../application/dto/CreateVisitor.dto';
import { DOCUMENT_TYPES } from '../../domain/entities/Visitor';
import * as joi from 'joi';
import { brandSchema, colorSchema, detailOnCreate } from '../../../../shared/validations/vehicleDetails.validation';

// Mismas reglas que el formulario del front, para que lo que pasa allá no falle acá.
const NAME_PATTERN = /^[\p{L}][\p{L}\s'.-]*$/u;
const DOCUMENT_NUMBER_PATTERN = /^\d{6,11}$/;
// Placa de moto colombiana: ABC12D; las motos antiguas no llevan la letra final (ABC12).
// La última posición también admite un número (ABC123).
const PLATE_PATTERN = /^[A-Z]{3}[0-9]{2}[A-Z0-9]?$/;

type ValidationResult = {
  error: joi.ValidationError | undefined;
  value: CreateVisitorDto;
};

const nameField = (label: string) => joi.string()
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

// Vehículo del visitante: sin id_owner, no es dueño registrado, solo pasa con un carro.
const visitorVehicleSchema = joi.object({
  plate: joi.string()
    .replace(/[\s-]/g, '')
    .uppercase()
    .pattern(PLATE_PATTERN)
    .messages({
      'string.pattern.base': 'La placa debe tener el formato ABC12D: 3 letras, 2 números y una letra o número al final (opcional en motos antiguas)',
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
});

const visitorSchema = joi.object({
  first_name: nameField('nombre'),

  last_name: nameField('apellido'),

  document_type: joi.string()
    .valid(...DOCUMENT_TYPES)
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

  vehicle: visitorVehicleSchema
    .required()
    .messages({
      'any.required': 'El vehículo es un campo requerido',
    }),
}).required();

export function validateCreateVisitor(data: any): ValidationResult {
  // abortEarly: false devuelve todos los errores juntos, para pintarlos de una vez en el formulario.
  return visitorSchema.validate(data, { abortEarly: false });
}