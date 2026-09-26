import express from "express";
import vehicleRoutes from '../modules/Vehicle/infraestructure/routes/Vehicle.routes'
import userRoutes from '../modules/User/infraestructure/routes/User.routes'
import visitorRoutes from '../modules/Visitors/infraestructure/routes/Visitor.routes'
import incidentRoutes from '../modules/Incidents/infraestructure/routes/Incident.routes'

export function createApp() {
  const app = express();
  const cors = require('cors');
  app.use(express.json());
  app.use(cors());
  app.use('/vehicles', vehicleRoutes);
  app.use('/users', userRoutes);
  app.use('/visitors', visitorRoutes);
  app.use('/incidents', incidentRoutes);
  
  return app;
}