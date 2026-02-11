import { describe, expect, it } from 'vitest';
import { flightSearchSchema } from './validation';

describe('flightSearchSchema', () => {
  it('accepts valid values', () => {
    expect(flightSearchSchema.safeParse({ airlineIata: 'AA', flightNumber: '100', departureDate: '2026-01-01' }).success).toBe(true);
  });

  it('rejects bad values', () => {
    expect(flightSearchSchema.safeParse({ airlineIata: 'AAA', flightNumber: '', departureDate: '01-01-2026' }).success).toBe(false);
  });
});
