// import { Router } from 'express';
// import { searchFlights } from '../controllers/flights.controller';
// import asyncError from '../middleware/asyncError.middleware';

// const flightHandler: Router = Router();

// flightHandler.post('/api/flights', asyncError(searchFlights));

// export default flightHandler;

// // import { Router, Request, Response, NextFunction } from 'express';
// // import { aiAgent } from '../services/aiAgent.js';

// // const router: Router = Router();

// // /**
// //  * Flight routes - Proxies to typescript-agents:3002/flight/*
// //  */

// // // Search flights
// // router.post('/search', async (req: Request, res: Response, next: NextFunction) => {
// //   try {
// //     const response = await aiAgent.post('/flight/search', req.body);
// //     res.json(response.data);
// //   } catch (error) {
// //     next(error);
// //   }
// // });

// // // Get flight details
// // router.get('/:flightId', async (req: Request, res: Response, next: NextFunction) => {
// //   try {
// //     const { flightId } = req.params;
// //     const response = await aiAgent.get(`/flight/${flightId}`);
// //     res.json(response.data);
// //   } catch (error) {
// //     next(error);
// //   }
// // });

// // // Book flight
// // router.post('/book', async (req: Request, res: Response, next: NextFunction) => {
// //   try {
// //     const response = await aiAgent.post('/flight/book', req.body);
// //     res.json(response.data);
// //   } catch (error) {
// //     next(error);
// //   }
// // });

// // // Cancel flight booking
// // router.delete('/bookings/:bookingId', async (req: Request, res: Response, next: NextFunction) => {
// //   try {
// //     const { bookingId } = req.params;
// //     const response = await aiAgent.delete(`/flight/bookings/${bookingId}`);
// //     res.json(response.data);
// //   } catch (error) {
// //     next(error);
// //   }
// // });

// // export default router;
