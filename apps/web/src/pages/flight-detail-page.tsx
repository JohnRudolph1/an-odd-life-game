import { useParams } from 'react-router-dom';
import { httpsCallable } from 'firebase/functions';
import { useState } from 'react';
import { SeatMap } from '@/components/seat-map';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useSeatMap } from '@/hooks/use-flight';
import { functions } from '@/lib/firebase';
import type { Seat } from '@/types';

export function FlightDetailPage() {
  const { flightId = '' } = useParams();
  const seats = useSeatMap(flightId);
  const [selected, setSelected] = useState<Seat | null>(null);

  const moveToEmpty = async () => {
    if (!selected) return;
    const fn = httpsCallable(functions, 'moveToEmptySeat');
    await fn({ flightId, seatId: selected.seatId });
  };

  return (
    <div className="space-y-4">
      <Card className="flex items-center justify-between">
        <p className="text-sm">Flight: {flightId}</p>
        <Button onClick={moveToEmpty} disabled={!selected}>Move to selected seat</Button>
      </Card>
      <SeatMap seats={seats} onSelect={setSelected} />
    </div>
  );
}
