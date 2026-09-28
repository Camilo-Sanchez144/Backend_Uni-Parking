import * as joi from 'joi';

export type ChangeRoleData = {
  roleId: number;
};

type ValidationResult = {
  error: joi.ValidationError | undefined;
  value: ChangeRoleData;
};

/** Cuerpo de PATCH /users/:userId/role. Que el rol exista lo revisa ChangeUserRoleUseCase. */
export function validateChangeRole(data: any): ValidationResult {
  const schema = joi.object({
    roleId: joi.number()
      .integer()
      .positive()
      .required()
      .messages({
        'number.base': 'El rol debe ser un número',
        'number.integer': 'El rol debe ser un número entero',
        'number.positive': 'El rol debe ser un número positivo',
        'any.required': 'El rol es obligatorio',
      }),
  });

  return schema.validate(data);
}
