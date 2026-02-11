import { useMemo, useState } from 'react';
import type { Seat } from '@/types';
import { SeatCell } from './seat';
import { Card } from './ui/card';
import { Input } from './ui/input';

export function SeatMap({ seats, onSelect }: { seats: Seat[]; onSelect: (seat: Seat) => void }) {
  const [filter, setFilter] = useState('');
  const [emptyOnly, setEmptyOnly] = useState(false);
  const filtered = useMemo(() => seats.filter((s) => {
    if (emptyOnly && s.occupantUid) return false;
    return filter ? s.attributes.some((a) => a.includes(filter)) : true;
  }), [seats, filter, emptyOnly]);

  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Input placeholder="attribute filter (window/aisle)" value={filter} onChange={(e) => setFilter(e.target.value)} />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={emptyOnly} onChange={(e) => setEmptyOnly(e.target.checked)} /> Empty only</label>
      </div>
      <div className="grid max-h-[460px] grid-cols-6 gap-2 overflow-auto" role="grid" tabIndex={0}>
        {filtered.map((seat) => <SeatCell key={seat.seatId} seat={seat} onSelect={onSelect} />)}
      </div>
      <div className="flex gap-4 text-xs"><span>🟩 Available</span><span>🟥 Occupied</span></div>
    </Card>
  );
}
