import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../apps/web/src/components/ui/card';

function RequestCard() { return <Card>Swap request: 3A ↔ 5C (pending)</Card>; }
const meta: Meta<typeof RequestCard> = { title: 'Request Card', component: RequestCard };
export default meta;
export const Default: StoryObj<typeof RequestCard> = {};
