import express from "express";
import vehicleRoutes from '../modules/Vehicle/infraestructure/routes/Vehicle.routes'
import incidentRoutes from '../modules/Incidents/infraestructure/routes/Incident.routes'

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use('/vehicles', vehicleRoutes);
  app.use('/incidents', incidentRoutes);
  
  return app;
}