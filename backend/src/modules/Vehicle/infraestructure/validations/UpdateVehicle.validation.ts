import * as joi from 'joi';
import { CreateVehicleData } from './CreateVehicle.validation';
import { brandSchema, colorSchema, detailOnUpdate } from '../../../../shared/validations/vehicleDetails.validation';

export type UpdateVehicleData = Partial<Omit<CreateVehicleData, 'plate' | 'id_owner' | 'owner'>>;

type ValidationResult = {
  error: joi.ValidationError | undefined;
  value: UpdateVehicleData;
};

export function validateUpdateVehicle(data: any): ValidationResult {
  const updateSchema = joi.object({
    // Para dejar vacía la marca o el color de una bicicleta o un scooter, hay que enviar también `type`.
    brand: detailOnUpdate(brandSchema()),

    model: joi.number()
      .messages({
        'number.base': 'El modelo debe ser un número',
      }),

    color: detailOnUpdate(colorSchema()),

    type: joi.string()
      .trim()
      .messages({
        'string.empty': 'El tipo no puede estar vacío',
      }),
  }).min(1);

  return updateSchema.validate(data);
}