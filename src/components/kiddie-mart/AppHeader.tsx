
"use client";
import { useKiddieMart } from '@/context/KiddieMartContext';
import { Button } from '@/components/ui/button';
import { LogOut, ShoppingCart } from 'lucide-react'; // Changed Sparkles to ShoppingCart for grocery store

export function AppHeader() {
  const { user, logout } = useKiddieMart();

  if (!user) return null;

  const displayRole = user.role === 'admin' ? 'Admin' : 'Cajero/a';

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-primary text-primary-foreground flex items-center justify-between px-4 md:px-6 shadow-lg z-50">
      <div className="flex items-center gap-2">
        <ShoppingCart className="h-8 w-8 text-accent" />
        <h1 className="text-2xl font-bold tracking-tight">Mini Market</h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm hidden md:inline">
          ¡Hola, <span className="font-semibold">{user.name}</span>! ({displayRole})
        </span>
        <Button variant="ghost" size="sm" onClick={logout} className="text-primary-foreground hover:bg-primary/80">
          <LogOut className="mr-2 h-5 w-5" /> Cerrar Sesión
        </Button>
      </div>
    </header>
  );
}
