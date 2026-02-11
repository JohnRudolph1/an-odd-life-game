import { z } from 'zod';

export const flightSearchSchema = z.object({
  airlineIata: z.string().length(2),
  flightNumber: z.string().min(1),
  departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
});
