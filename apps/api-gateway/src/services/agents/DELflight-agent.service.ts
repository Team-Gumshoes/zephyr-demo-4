// import { ChatRequest, FlightResponseData } from '../../types/agents';
// import { BaseAgentService } from './base-agent.service';

// export class FlightAgentService extends BaseAgentService {
//   async searchFlights(request: ChatRequest): Promise<FlightResponseData> {
//     return this.post<FlightResponseData>('/flights', request);
//   }

//   async getFlightDetails(flightId: string): Promise<FlightResponseData> {
//     return this.post<FlightResponseData>('/flights/details', { flightId });
//   }

//   // Additional flight-specific methods
// }

// // Export singleton instance
// export const flightsAgentService = new FlightAgentService();
