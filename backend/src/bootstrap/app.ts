import express from "express";
import vehicleRoutes from '../modules/Vehicle/infraestructure/routes/Vehicle.routes'

export function createApp() {
  const app = express();
  const cors = require('cors');
  app.use(express.json());
  app.use(cors());
  app.use('/vehicles', vehicleRoutes);
  
  return app;
}