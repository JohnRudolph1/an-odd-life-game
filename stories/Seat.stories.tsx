import type { Meta, StoryObj } from '@storybook/react';
import { SeatCell } from '../apps/web/src/components/seat';

const meta: Meta<typeof SeatCell> = { title: 'Seat', component: SeatCell };
export default meta;
export const Available: StoryObj<typeof SeatCell> = { args: { seat: { seatId: '12A', row: 12, col: 1, cabinClass: 'economy', attributes: ['window'] }, onSelect: () => {} } };
