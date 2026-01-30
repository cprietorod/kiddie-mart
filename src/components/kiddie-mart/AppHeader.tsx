"use client";
import { useKiddieMart } from '@/context/KiddieMartContext';
import { Button } from '@/components/ui/button';
import { LogOut, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export function AppHeader() {
  const { user, logout } = useKiddieMart();
  const t = useTranslations('AppHeader');

  if (!user) return null;

  const displayRole = user.role === 'admin' ? t('role_admin') : t('role_cashier');

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-primary text-primary-foreground flex items-center justify-between px-4 md:px-6 shadow-lg z-50">
      <div className="flex items-center gap-2">
        <ShoppingCart className="h-8 w-8 text-accent" />
        <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        <span className="text-sm hidden md:inline">
          {t.rich('welcome', {
            name: user.name,
            span_variable: (chunks) => <span className="font-semibold">{chunks}</span>
          })} ({displayRole})
        </span>
        <Button variant="ghost" size="sm" onClick={logout} className="text-primary-foreground hover:bg-primary/80">
          <LogOut className="mr-2 h-5 w-5" /> {t('logout')}
        </Button>
      </div>
    </header>
  );
}
