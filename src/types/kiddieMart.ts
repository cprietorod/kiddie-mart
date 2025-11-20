
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  emoji: string;
  image?: string;
  dataAiHint?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface SaleRecord {
  id: string;
  timestamp: string;
  total: number;
  items: number;
  paymentMethod: 'Card' | 'Cash';
  details: CartItem[];
}

export interface UserSession {
  id: string;
  name: string;
  role: 'admin' | 'staff';
}

export type AppView =
  | 'login'
  | 'staff_pos'
  | 'admin_dashboard'
  | 'admin_products'
  | 'admin_sales'
  | 'admin_reports'
  | 'admin_wallets';

// For AI Product Suggestions (generic term now)
export interface ProductSuggestion { // Renamed from ToySuggestion
  name: string;
  reason?: string;
  emoji?: string;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  qrCode: string;
}

export type CashierDifficulty = 'preschool' | 'primary';
