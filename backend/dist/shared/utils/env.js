"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequiredEnv = getRequiredEnv;
function getRequiredEnv(key) {
    const value = process.env[key];
    if (!value)
        throw new Error(`Falta la variable de entorno: ${key}`);
    return value;
}
/* export function getOptionalEnv(key: string, fallback = ""): string {
  const value = process.env[key];
  return value !== undefined ? value : fallback;
} */ 
//# sourceMappingURL=env.js.map