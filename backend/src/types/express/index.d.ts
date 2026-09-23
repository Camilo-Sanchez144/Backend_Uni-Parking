/*  ¿Para qué sirve?

    Un archivo pequeño de tipos para que TypeScript sepa que req.user existe (detalle técnico normal en Express + TypeScript)
*/

/** Lo que queda de un token de Firebase ya verificado (auth.middleware.ts lo llena). */
export interface AuthenticatedUser {
  uid: string;
  email: string | null;
}

declare global {
  namespace Express {
    interface Request {
      /** Presente solo en rutas protegidas por verifyFirebaseToken. */
      user?: AuthenticatedUser;
    }
  }
}

// Un archivo de declaraciones globales necesita al menos un import/export para que
// TypeScript lo trate como módulo y no sobrescriba otras declaraciones globales.
export {};
