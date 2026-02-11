import type { Meta, StoryObj } from '@storybook/react';
import { SeatMap } from '../apps/web/src/components/seat-map';

const seats = Array.from({ length: 12 }).map((_, i) => ({ seatId: `${Math.floor(i / 6) + 1}${'ABCDEF'[i % 6]}`, row: Math.floor(i / 6) + 1, col: (i % 6) + 1, cabinClass: 'economy', attributes: ['aisle'] }));
const meta: Meta<typeof SeatMap> = { title: 'SeatMap', component: SeatMap };
export default meta;
export const Default: StoryObj<typeof SeatMap> = { args: { seats: seats as any, onSelect: () => {} } };
