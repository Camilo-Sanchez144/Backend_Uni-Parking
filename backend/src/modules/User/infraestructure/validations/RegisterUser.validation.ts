import * as joi from 'joi';

export type RegisterUserData = {
  name: string;
};

type ValidationResult = {
  error: joi.ValidationError | undefined;
  value: RegisterUserData;
};

export function validateRegisterUser(data: any): ValidationResult {
  const schema = joi.object({
    name: joi.string()
      .trim()
      .min(2)
      .max(100)
      .pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/)
      .required()
      .messages({
        'string.pattern.base': 'El nombre solo puede contener letras',
        'string.empty': 'El nombre es obligatorio',
        'string.min': 'El nombre debe tener al menos 2 caracteres',
      }),
  });

  return schema.validate(data);
}