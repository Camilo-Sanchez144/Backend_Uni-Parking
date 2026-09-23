import cors from "cors";
import express from "express";
import { AppDataSource } from "../shared/config/database";
import vehicleRoutes from '../modules/Vehicle/infraestructure/routes/Vehicle.routes'
import visitorRoutes from '../modules/visitors/infraestructure/routes/VisitorRoutes'

// Orígenes desde los que el navegador puede llamar a esta API. En desarrollo,
// el frontend corre con `ng serve` en el puerto 4200.
const ALLOWED_ORIGINS = ["http://localhost:4200"];

export function createApp() {
  const app = express();
  app.use(cors({ origin: ALLOWED_ORIGINS }));
  app.use(express.json());
  app.use('/vehicles', vehicleRoutes);
  app.use('/visitors', visitorRoutes);

  return app;
}