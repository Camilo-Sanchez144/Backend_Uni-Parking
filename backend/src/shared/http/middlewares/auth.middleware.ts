/*  ¿Para qué sirve?

    El "portero": lee el header Authorization, verifica el token con verifyIdToken, y si es válido deja pasar la petición guardando quién es (uid, correo)
*/
import { NextFunction, Request, Response } from "express";
import { firebaseAuth } from "../../config/firebase-admin";

/**
 * Exige un token de Firebase válido en el header `Authorization: Bearer <token>`.
 *
 * Todavía no se aplica a ninguna ruta (ver planeacion-desarrollo.md, fase de
 * conexión): primero se prueba que los datos viajen bien entre el front y el
 * back, y este middleware queda listo para el siguiente paso, cuando el
 * frontend ya pueda iniciar sesión de verdad contra Firebase.
 */
export async function verifyFirebaseToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Falta el token de autenticación" });
    return;
  }

  const token = header.slice("Bearer ".length).trim();

  try {
    const decoded = await firebaseAuth.verifyIdToken(token);
    req.user = { uid: decoded.uid, email: decoded.email ?? null };
    next();
  } catch (error) {
    console.error("Token de Firebase inválido:", error);
    res.status(401).json({ message: "Token inválido o vencido" });
  }
}
