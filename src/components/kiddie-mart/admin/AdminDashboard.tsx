
"use client";
import { useKiddieMart } from '@/context/KiddieMartContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ProductManagement } from './ProductManagement';
import { SalesHistoryView } from './SalesHistoryView';
import { AdminWalletManagement } from './AdminWalletManagement';
import { ReportsDashboardView } from './ReportsDashboardView';
import { LayoutDashboard, Package, ReceiptText, LineChart, ShoppingBasket, Sparkles, Wallet } from 'lucide-react'; // Changed ToyBrick to ShoppingBasket
import type { AppView } from '@/types/kiddieMart';

interface NavItemProps {
  view: AppView;
  currentView: AppView;
  setView: (view: AppView) => void;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ view, currentView, setView, icon, label }) => (
  <li>
    <Button
      variant={currentView === view ? 'secondary' : 'ghost'}
      onClick={() => setView(view)}
      className={`w-full justify-start text-base py-3 px-4 rounded-lg transition-all duration-200
                  ${currentView === view
          ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md transform scale-105'
          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}
    >
      {icon} {label}
    </Button>
  </li>
);

export function AdminDashboard() {
  const { currentView, setCurrentView } = useKiddieMart();

  let content;
  switch (currentView) {
    case 'admin_products':
      content = <ProductManagement />;
      break;
    case 'admin_sales':
      content = <SalesHistoryView />;
      break;
    case 'admin_reports':
      content = <ReportsDashboardView />;
      break;
    case 'admin_wallets':
      content = <AdminWalletManagement />;
      break;
    case 'admin_dashboard':
    default:
      content = (
        <div className="p-6 md:p-10 flex flex-col items-center justify-center text-center h-full">
          <ShoppingBasket className="h-24 w-24 text-accent mb-6 animate-bounce" />
          <h1 className="text-4xl font-bold text-primary mb-3">¡Bienvenido/a, Gerente!</h1>
          <p className="text-lg text-muted-foreground max-w-md">
            Este es tu centro de control para todos los productos en Mini Market. Elige una opción del menú para empezar.
          </p>
        </div>
      );
  }

  return (
    <div className="flex h-screen pt-16 bg-muted/40">
      <nav className="w-64 bg-sidebar text-sidebar-foreground flex flex-col flex-shrink-0 shadow-2xl">
        <div className="p-5 text-2xl font-bold border-b border-sidebar-border flex items-center gap-2">
          <Sparkles className="h-7 w-7 text-sidebar-primary" /> Admin Mini Market
        </div>
        <ScrollArea className="flex-grow">
          <ul className="p-3 space-y-2">
            <NavItem view="admin_dashboard" currentView={currentView} setView={setCurrentView} icon={<LayoutDashboard className="mr-3 h-6 w-6" />} label="Panel Principal" />
            <NavItem view="admin_products" currentView={currentView} setView={setCurrentView} icon={<Package className="mr-3 h-6 w-6" />} label="Lista de Productos" />
            <NavItem view="admin_sales" currentView={currentView} setView={setCurrentView} icon={<ReceiptText className="mr-3 h-6 w-6" />} label="Historial de Ventas" />
            <NavItem view="admin_reports" currentView={currentView} setView={setCurrentView} icon={<LineChart className="mr-3 h-6 w-6" />} label="Reportes" />
            <NavItem view="admin_wallets" currentView={currentView} setView={setCurrentView} icon={<Wallet className="mr-3 h-6 w-6" />} label="Billeteras / Cuentas" />
          </ul>
        </ScrollArea>
        <div className="p-4 border-t border-sidebar-border text-center text-xs text-sidebar-foreground/70">
          Admin Mini Market v1.0
        </div>
      </nav>
      <main className="flex-1 bg-background overflow-y-auto">
        {content}
      </main>
    </div>
  );
}
