import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { AuthProvider, useAuth } from '@/contexts/auth-context';
import { ThemeProvider } from '@/contexts/theme-context';
import { AppShell } from '@/components/app-shell';
import { LoginPage } from '@/pages/login-page';
import { FlightsPage } from '@/pages/flights-page';
import { FlightDetailPage } from '@/pages/flight-detail-page';
import { AdminPage } from '@/pages/admin-page';

const client = new QueryClient();

function Protected() {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  return user ? <AppShell /> : <Navigate to="/login" />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<Protected />}>
                <Route path="/flights" element={<FlightsPage />} />
                <Route path="/flight/:flightId" element={<FlightDetailPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/flights" />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
