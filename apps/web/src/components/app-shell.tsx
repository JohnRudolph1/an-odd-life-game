import { Link, Outlet } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { useAuth } from '@/contexts/auth-context';
import { Button } from './ui/button';

export function AppShell() {
  const { theme, toggle } = useTheme();
  const { logout } = useAuth();
  return (
    <div className="min-h-screen md:grid md:grid-cols-[220px_1fr]">
      <aside className="hidden border-r p-4 md:block">
        <nav className="space-y-2">
          <Link to="/flights">Flights</Link><br />
          <Link to="/admin">Admin</Link>
        </nav>
      </aside>
      <div>
        <header className="flex items-center justify-between border-b p-4">
          <h1 className="font-semibold">Seat Swap App</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={toggle}>{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}</Button>
            <Button variant="outline" onClick={() => logout()}>Logout</Button>
          </div>
        </header>
        <main className="p-4"><Outlet /></main>
      </div>
    </div>
  );
}
