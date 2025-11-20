
"use client";

import { KiddieMartProvider, useKiddieMart } from '@/context/KiddieMartContext';
import { LoginScreen } from '@/components/kiddie-mart/LoginScreen';
import { StaffPOSInterface } from '@/components/kiddie-mart/StaffPOSInterface';
import { AdminDashboard } from '@/components/kiddie-mart/admin/AdminDashboard';
import { AppHeader } from '@/components/kiddie-mart/AppHeader';
import { Loader2 } from 'lucide-react';

function KiddieMartApp() {
  const { currentView, user, isLoadingData } = useKiddieMart();

  if (isLoadingData && currentView === 'login') { // Show loading screen only if not logged in yet and data is loading
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 text-primary animate-spin" />
        <p className="mt-4 text-lg text-muted-foreground">Cargando datos de la tienda...</p>
      </div>
    );
  }

  let viewComponent;
  switch (currentView) {
    case 'login':
      viewComponent = <LoginScreen />;
      break;
    case 'staff_pos':
      viewComponent = <StaffPOSInterface />;
      break;
    case 'admin_dashboard':
    case 'admin_products':
    case 'admin_sales':
    case 'admin_reports':
    case 'admin_wallets':
      viewComponent = <AdminDashboard />;
      break;
    default:
      viewComponent = <LoginScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {user && <AppHeader />}
      <div className={`flex-grow ${user ? '' : 'h-screen'}`}>
        {viewComponent}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <KiddieMartProvider>
      <KiddieMartApp />
    </KiddieMartProvider>
  );
}
