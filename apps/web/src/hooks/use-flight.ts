import { httpsCallable } from 'firebase/functions';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { db, functions } from '@/lib/firebase';
import type { Flight, Seat } from '@/types';

export function useSearchFlight() {
  return useMutation({
    mutationFn: async (payload: { airlineIata: string; flightNumber: string; departureDate: string }) => {
      const callable = httpsCallable(functions, 'searchFlightAndUpsert');
      const { data } = await callable(payload);
      return data as Flight;
    }
  });
}

export function useSeatMap(flightId: string) {
  const [seats, setSeats] = useState<Seat[]>([]);
  useEffect(() => {
    if (!flightId) return;
    const unsub = onSnapshot(query(collection(db, `flights/${flightId}/seats`)), (snap) => {
      setSeats(snap.docs.map((d) => d.data() as Seat));
    });
    return () => unsub();
  }, [flightId]);
  return seats;
}

export function useMyFlights(uid?: string) {
  return useQuery({
    queryKey: ['myFlights', uid],
    enabled: !!uid,
    queryFn: async () => {
      const callable = httpsCallable(functions, 'listMyFlights');
      const { data } = await callable({});
      return data as Flight[];
    }
  });
}
