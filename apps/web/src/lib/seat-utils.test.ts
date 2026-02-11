import { describe, expect, it } from 'vitest';
import { filterSeats } from './seat-utils';

describe('filterSeats', () => {
  const seats = [
    { seatId: '1A', row: 1, col: 1, cabinClass: 'economy', attributes: ['window'] },
    { seatId: '1B', row: 1, col: 2, cabinClass: 'economy', attributes: ['aisle'], occupantUid: 'u1' }
  ] as any;

  it('filters empty', () => {
    expect(filterSeats(seats, { emptyOnly: true })).toHaveLength(1);
  });

  it('filters by attribute', () => {
    expect(filterSeats(seats, { attr: 'aisle' })[0].seatId).toBe('1B');
  });
});
