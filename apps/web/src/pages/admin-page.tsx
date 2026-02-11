import { httpsCallable } from 'firebase/functions';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { functions } from '@/lib/firebase';

export function AdminPage() {
  const [templateId, setTemplateId] = useState('single-aisle-default');
  return (
    <Card className="space-y-3 max-w-xl">
      <h2 className="text-lg font-semibold">Admin tools</h2>
      <Input value={templateId} onChange={(e) => setTemplateId(e.target.value)} />
      <Button onClick={async () => {
        const fn = httpsCallable(functions, 'createSeatMapTemplate');
        await fn({ templateId, rows: 30, cols: 6 });
      }}>Create template</Button>
    </Card>
  );
}
