import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/auth-context';
import { useMyFlights, useSearchFlight } from '@/hooks/use-flight';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const schema = z.object({ airlineIata: z.string().length(2), flightNumber: z.string().min(1), departureDate: z.string() });

export function FlightsPage() {
  const nav = useNavigate();
  const { user } = useAuth();
  const search = useSearchFlight();
  const flights = useMyFlights(user?.uid);
  const { register, handleSubmit } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  return (
    <div className="space-y-4">
      <Card>
        <form className="grid gap-2 md:grid-cols-4" onSubmit={handleSubmit(async (v) => {
          const flight = await search.mutateAsync(v);
          nav(`/flight/${flight.id}`);
        })}>
          <Input placeholder="Airline IATA" {...register('airlineIata')} />
          <Input placeholder="Flight #" {...register('flightNumber')} />
          <Input type="date" {...register('departureDate')} />
          <Button type="submit">Search flight</Button>
        </form>
      </Card>
      <Card>
        <h3 className="mb-2 font-semibold">My flights</h3>
        <div className="space-y-2">
          {(flights.data ?? []).map((f) => (
            <button key={f.id} className="block w-full rounded border p-2 text-left" onClick={() => nav(`/flight/${f.id}`)}>
              {f.airlineIata}{f.flightNumber} {f.originIata}→{f.destinationIata}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
