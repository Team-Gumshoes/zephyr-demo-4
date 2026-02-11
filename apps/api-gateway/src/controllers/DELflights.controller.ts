// import { Request, Response } from 'express';
// import { flightsAgentService } from '../services/agents/flight-agent.service';
// import { ChatRequest } from '../types/agents';

// // ************* POST /flights ????  ************
// const searchFlights = async (req: Request, res: Response): Promise<void> => {
//   const {
//     body: { sessionId, message },
//   } = req;

//   // Validate required fields
//   if (!sessionId || !message) {
//     res.status(400).json({
//       error: 'sessionId and message are required',
//     });
//     return;
//   }

//   // // Save user message to database
//   // await createChatMessage({
//   //   supabase,
//   //   sessionId,
//   //   role: 'user',
//   //   content: { text: message },
//   // });

//   const flightsRequest: ChatRequest = {
//     messages: [{ type: 'human', content: message }],
//     trip: {
//       origin: null,
//       destination: null,
//       departureFlight: null,
//       returnFlight: null,
//       departureDate: null,
//       returnDate: null,
//       budget: null,
//       hotel: null,
//       interests: [],
//       constraints: [],
//     },
//   };

//   const data = await flightsAgentService.searchFlights(flightsRequest);

//   // const llmMessage = data.messages[data.messages.length - 1].content;
//   console.log({data});
//   // const llmResponse = await typescriptAgentsClient.post('/coordinate', req.body );
//   // const llmResponse = `The response to: "${message}" is: ${llmMessage}.`;

//   // Return the assistant response
//   res.status(200).json(data);
// };

// export { searchFlights };
