import * as joi from 'joi';

/**
 * Reglas compartidas de marca y color, para los vehículos de la comunidad y los de visitantes.
 *
 * Bicicletas y scooters pueden dejar la marca y el color en blanco, porque no siempre se
 * conocen; la moto los exige, porque vienen en su tarjeta de propiedad.
 */

/** Tipos de vehículo en los que la marca y el color pueden quedar vacíos. */
export const OPTIONAL_DETAILS_TYPES = ['bicicleta', 'scooter'] as const;

/**
 * Se cumple cuando `type` es bicicleta o scooter, sin importar mayúsculas ni espacios.
 * `required()` hace que no se cumpla si `type` no viene: Joi, por defecto, lo daría por cumplido.
 */
const hasOptionalDetails = joi.string().trim().lowercase().valid(...OPTIONAL_DETAILS_TYPES).required();

/** Letras (con tildes y ñ), números y palabras separadas por un espacio o un guion: "Mazda 3", "Royal Enfield", "Harley-Davidson". */
const BRAND_PATTERN = /^[\p{L}\d]+(?:[ -][\p{L}\d]+)*$/u;

/** Letras (con tildes y ñ) y palabras separadas por un espacio: "Azul oscuro". */
const COLOR_PATTERN = /^\p{L}+(?: \p{L}+)*$/u;

/** Marca. Los espacios repetidos se vuelven uno solo antes de validar. */
export function brandSchema(): joi.StringSchema {
  return joi.string()
    .trim()
    .replace(/\s+/g, ' ')
    .min(2)
    .pattern(BRAND_PATTERN)
    .messages({
      'string.pattern.base': 'La marca solo puede tener letras, números, espacios y guiones',
      'string.empty': 'La marca es obligatoria',
      'string.min': 'La marca debe tener al menos 2 caracteres',
      'any.required': 'La marca es obligatoria',
    });
}

/** Color. Los espacios repetidos se vuelven uno solo antes de validar. */
export function colorSchema(): joi.StringSchema {
  return joi.string()
    .trim()
    .replace(/\s+/g, ' ')
    .min(3)
    .pattern(COLOR_PATTERN)
    .messages({
      'string.pattern.base': 'El color solo puede tener letras y espacios',
      'string.empty': 'El color es obligatorio',
      'string.min': 'El color debe tener al menos 3 caracteres',
      'any.required': 'El color es obligatorio',
    });
}

/**
 * Marca o color al crear. En bicicleta y scooter puede venir vacío, o no venir: en ese caso se
 * guarda vacío, porque la columna no admite null. En los demás tipos es obligatorio.
 */
export function detailOnCreate(field: joi.StringSchema): joi.Schema {
  return joi.when('type', {
    is: hasOptionalDetails,
    then: field.allow('').default(''),
    otherwise: field.required(),
  });
}

/**
 * Marca o color al actualizar: puede no venir. Solo se puede dejar vacío si en la misma
 * petición llega `type` bicicleta o scooter, para no borrarle la marca a una moto por error.
 */
export function detailOnUpdate(field: joi.StringSchema): joi.Schema {
  return joi.when('type', {
    is: hasOptionalDetails,
    then: field.allow(''),
    otherwise: field,
  });
}
