import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });

export function LoginPage() {
  const nav = useNavigate();
  const { loginEmail, loginGoogle } = useAuth();
  const { register, handleSubmit } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  return (
    <div className="mx-auto mt-24 max-w-md">
      <Card className="space-y-4">
        <h2 className="text-xl font-semibold">Login</h2>
        <form className="space-y-3" onSubmit={handleSubmit(async (v) => { await loginEmail(v.email, v.password); nav('/flights'); })}>
          <Input placeholder="Email" {...register('email')} />
          <Input type="password" placeholder="Password" {...register('password')} />
          <Button type="submit" className="w-full">Sign in</Button>
        </form>
        <Button variant="outline" className="w-full" onClick={async () => { await loginGoogle(); nav('/flights'); }}>Continue with Google</Button>
      </Card>
    </div>
  );
}
