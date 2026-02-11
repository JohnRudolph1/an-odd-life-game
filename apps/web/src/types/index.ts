export type Flight = {
  id: string;
  airlineIata: string;
  flightNumber: string;
  departureDate: string;
  originIata: string;
  destinationIata: string;
  scheduledDepartureAt: string;
  scheduledArrivalAt: string;
  aircraft: string;
};

export type Seat = {
  seatId: string;
  row: number;
  col: number;
  cabinClass: 'economy' | 'premium' | 'business';
  attributes: string[];
  occupantUid?: string;
};
