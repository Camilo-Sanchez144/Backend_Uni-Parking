import { getFirebaseAuth } from "../config/firebase";
import { DecodedIdToken } from "firebase-admin/auth";

export async function verifyFirebaseToken(authHeader?: string): Promise<DecodedIdToken> {
    if (!authHeader?.startsWith("Bearer ")) {
        throw new Error("Token no proporcionado");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        throw new Error("Token mal formado");
    }

    const decoded = await getFirebaseAuth().verifyIdToken(token);
    return decoded;
}