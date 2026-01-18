import { Router, Request, Response } from 'express';
import flightsRouter from './flights.routes';
import hotelsRouter from './hotels.routes';
import transportRouter from './transport.routes';
import coordinatorRouter from './coordinator.routes';

const router: Router = Router();

// Health check endpoint
router.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'api-gateway',
    timestamp: new Date().toISOString(),
  });
});

// Mount route modules
router.use('/flights', flightsRouter);
router.use('/hotels', hotelsRouter);
router.use('/transport', transportRouter);
router.use('/coordinate', coordinatorRouter);

export default router;
