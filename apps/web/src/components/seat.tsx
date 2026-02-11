import { cn } from '@/lib/utils';
import type { Seat } from '@/types';

export function SeatCell({ seat, selected, onSelect }: { seat: Seat; selected?: boolean; onSelect: (seat: Seat) => void }) {
  const occupied = !!seat.occupantUid;
  return (
    <button
      aria-label={`Seat ${seat.seatId}`}
      onClick={() => onSelect(seat)}
      className={cn(
        'h-9 w-9 rounded-md border text-xs font-semibold',
        occupied ? 'bg-rose-200 text-rose-900' : 'bg-emerald-200 text-emerald-900',
        selected && 'ring-2 ring-primary'
      )}
    >
      {seat.seatId}
    </button>
  );
}
