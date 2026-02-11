import type { Seat } from '@/types';

export function filterSeats(seats: Seat[], opts: { emptyOnly?: boolean; attr?: string }) {
  return seats.filter((s) => (!opts.emptyOnly || !s.occupantUid) && (!opts.attr || s.attributes.includes(opts.attr)));
}
