import express from "express";
import { AppDataSource } from "../shared/config/database";
import vehicleRoutes from '../modules/Vehicle/infraestructure/routes/Vehicle.routes'

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use('/vehicles', vehicleRoutes);
  
  return app;
}