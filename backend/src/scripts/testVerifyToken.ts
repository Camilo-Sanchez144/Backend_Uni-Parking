import "dotenv/config";
import { verifyFirebaseToken } from "../shared/auth/verifyFirebaseToken";

async function main() {
  const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVjMjdhOWI2YWEzMDg4ZDI3Y2FkYjFjNjRmYTJmYTQ1Y2Y5ZmQ5ZTciLCJ0eXAiOiJKV1QifQ.eyJyb2xJZCI6MSwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3VuaXBhcmtpbmctZGV2IiwiYXVkIjoidW5pcGFya2luZy1kZXYiLCJhdXRoX3RpbWUiOjE3ODk5NTI1NTAsInVzZXJfaWQiOiJDdGoxVzJYRWNLVk54S3Q3c2VhZTh4dlI4ZlIyIiwic3ViIjoiQ3RqMVcyWEVjS1ZOeEt0N3NlYWU4eHZSOGZSMiIsImlhdCI6MTc4OTk1MjU1MCwiZXhwIjoxNzg5OTU2MTUwLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEB0ZXN0LmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.FACnLvoD0YCi97-ApiKtb3a6Fnb5zgYBbcSsCIBKi9fPn7Lvek-R_WhEeQOfPujmUspxz0FF4OqWRFd00EJF-gS1K5M5vdT0kvD6rkYp2XnaxkFZyTZtx_adQqERBSYTA7jX30ARbuSy4Zrfnb9apYcrM87Ty0trIHo-bITKmRpsWO0-WLdCVq5XiAVI_cCov3Rv-Jkgpj1ioiJgdJTgY7Kzp0GMrEB3BEtWEFMI71cux-d8t9ZIa6tQD43RHoksvfHaQGR7evISnb1kYHN7u5SagK5cZqOKsVs-WYLPdw90yLWNerKthefaghIiHYd2LUZrjZVIm5YuaaijtHriUw";

  try {
    const decoded = await verifyFirebaseToken(`Bearer ${token}`);
    console.log("✅ Token válido");
    console.log("UID:", decoded.uid);
    console.log("Email:", decoded.email);
    console.log("rolId (custom claim):", decoded.rolId);
  } catch (error) {
    console.error("❌ Token inválido:", error);
  }
}

main();