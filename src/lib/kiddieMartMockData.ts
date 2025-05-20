
import type { Product, SaleRecord } from '@/types/kiddieMart';

export const INITIAL_PRODUCTS: Product[] = [
  { id: 'item_1', name: 'Manzana Fuji', price: 0.75, category: 'Frutas', stock: 150, emoji: '🍎', dataAiHint: 'red apple' },
  { id: 'item_2', name: 'Plátano', price: 0.30, category: 'Frutas', stock: 200, emoji: '🍌', dataAiHint: 'banana' },
  { id: 'item_3', name: 'Zanahoria (manojo)', price: 1.20, category: 'Verduras', stock: 80, emoji: '🥕', dataAiHint: 'carrot bunch' },
  { id: 'item_4', name: 'Lechuga Iceberg', price: 1.50, category: 'Verduras', stock: 60, emoji: '🥬', dataAiHint: 'lettuce head' },
  { id: 'item_5', name: 'Leche Entera (1L)', price: 1.10, category: 'Lácteos', stock: 100, emoji: '🥛', dataAiHint: 'milk carton' },
  { id: 'item_6', name: 'Yogur Natural (500g)', price: 2.50, category: 'Lácteos', stock: 70, emoji: '🍦', dataAiHint: 'yogurt tub' }, // Emoji for yogurt is tricky, using ice cream as placeholder
  { id: 'item_7', name: 'Pan de Molde Blanco', price: 2.20, category: 'Panadería', stock: 90, emoji: '🍞', dataAiHint: 'bread loaf' },
  { id: 'item_8', name: 'Galletas Digestive', price: 1.80, category: 'Despensa', stock: 120, emoji: '🍪', dataAiHint: 'cookies packet' },
  { id: 'item_9', name: 'Agua Mineral (1.5L)', price: 0.60, category: 'Bebidas', stock: 180, emoji: '💧', dataAiHint: 'water bottle' },
  { id: 'item_10', name: 'Jugo de Naranja (1L)', price: 2.80, category: 'Bebidas', stock: 75, emoji: '🍊', dataAiHint: 'orange juice' },
  { id: 'item_11', name: 'Arroz Blanco (1kg)', price: 1.90, category: 'Despensa', stock: 100, emoji: '🍚', dataAiHint: 'rice bag' },
  { id: 'item_12', name: 'Aceite de Girasol (1L)', price: 3.50, category: 'Despensa', stock: 60, emoji: '🌻', dataAiHint: 'oil bottle' }, // Using sunflower for oil
  { id: 'item_13', name: 'Detergente Ropa (3L)', price: 7.50, category: 'Limpieza', stock: 40, emoji: '🧼', dataAiHint: 'detergent bottle' },
  { id: 'item_14', name: 'Pechuga de Pollo (kg)', price: 6.00, category: 'Carnes y Pescados', stock: 50, emoji: '🍗', dataAiHint: 'chicken breast' },
  { id: 'item_15', name: 'Salmón Fresco (kg)', price: 15.00, category: 'Carnes y Pescados', stock: 30, emoji: '🐟', dataAiHint: 'salmon fillet' },
];

const productsForSales = INITIAL_PRODUCTS.map(p => ({...p}));

export const MOCK_SALES_HISTORY: SaleRecord[] = [
  { id: 'sale_1', timestamp: '2025-04-08 10:15:00', total: 2.05, items: 2, paymentMethod: 'Card', details: [{ product: productsForSales[0], quantity: 1}, { product: productsForSales[3], quantity: 1}] }, // Apple + Lettuce
  { id: 'sale_2', timestamp: '2025-04-08 10:30:00', total: 3.30, items: 2, paymentMethod: 'Cash', details: [{ product: productsForSales[4], quantity: 1}, { product: productsForSales[6], quantity: 1}] }, // Milk + Bread
  { id: 'sale_3', timestamp: '2025-04-08 11:05:00', total: 10.30, items: 2, paymentMethod: 'Card', details: [{ product: productsForSales[12], quantity: 1}, { product: productsForSales[9], quantity: 1}] }, // Detergent + Juice
  { id: 'sale_4', timestamp: '2025-04-07 18:20:00', total: 6.00, items: 1, paymentMethod: 'Card', details: [{ product: productsForSales[13], quantity: 1}] }, // Chicken
  { id: 'sale_5', timestamp: '2025-04-07 17:55:00', total: 4.30, items: 2, paymentMethod: 'Cash', details: [{ product: productsForSales[7], quantity: 1}, { product: productsForSales[5], quantity: 1}] }, // Cookies + Yogurt
];
