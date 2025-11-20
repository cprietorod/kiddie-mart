
"use client";
import type { ReactNode } from 'react';
import React, { useState, createContext, useContext, useEffect, useMemo, useCallback } from 'react';
import type { Product, CartItem, SaleRecord, UserSession, AppView, Account, CashierDifficulty } from '@/types/kiddieMart';
import { INITIAL_PRODUCTS, MOCK_SALES_HISTORY } from '@/lib/kiddieMartMockData';
import { useToast } from "@/hooks/use-toast";
import {
  openDB,
  getAllProducts,
  addProductDB,
  updateProductDB,
  deleteProductDB,
  bulkAddProductsDB,
  getAllSalesHistory,
  addSaleRecordDB,
  bulkAddSalesHistoryDB,
  getAllAccounts,
  addAccountDB,
  updateAccountDB
} from '@/lib/indexedDbService';

interface KiddieMartContextType {
  user: UserSession | null;
  login: (role: 'admin' | 'staff') => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, change: number) => void;
  clearCart: () => void;
  cartTotal: number;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  salesHistory: SaleRecord[];
  recordSale: (paymentMethod: 'Card' | 'Cash' | 'QR', qrCode?: string) => Promise<boolean>;
  products: Product[];
  addProduct: (newProductData: Omit<Product, 'id'>) => void;
  updateProduct: (productId: string, updatedProductData: Partial<Omit<Product, 'id'>>) => void;
  deleteProduct: (productId: string) => void;
  isLoadingData: boolean;
  // New Features
  accounts: Account[];
  createAccount: (name: string, initialBalance: number) => void;
  topUpAccount: (accountId: string, amount: number) => void;
  cashierDifficulty: CashierDifficulty;
  setCashierDifficulty: (difficulty: CashierDifficulty) => void;
}

const KiddieMartContext = createContext<KiddieMartContextType | undefined>(undefined);

export const KiddieMartProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [salesHistory, setSalesHistory] = useState<SaleRecord[]>([]);
  const [currentView, setCurrentView] = useState<AppView>('login');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [cashierDifficulty, setCashierDifficulty] = useState<CashierDifficulty>('preschool');
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      setIsLoadingData(true);
      try {
        await openDB();
        let dbProducts = await getAllProducts();
        if (dbProducts.length === 0) {
          console.log('No products in DB, seeding initial products...');
          await bulkAddProductsDB(INITIAL_PRODUCTS);
          dbProducts = INITIAL_PRODUCTS;
        }
        setProducts(dbProducts);

        let dbSalesHistory = await getAllSalesHistory();
        if (dbSalesHistory.length === 0 && MOCK_SALES_HISTORY.length > 0) {
          console.log('No sales history in DB, seeding mock sales history...');
          await bulkAddSalesHistoryDB(MOCK_SALES_HISTORY);
          dbSalesHistory = MOCK_SALES_HISTORY.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        }
        setSalesHistory(dbSalesHistory);

        let dbAccounts = await getAllAccounts();
        setAccounts(dbAccounts);

      } catch (error) {
        console.error("Error loading data from IndexedDB:", error);
        toast({ title: "Error de Carga 😟", description: "No se pudieron cargar los datos de la tienda.", variant: "destructive" });
        // Fallback to mock data if IndexedDB fails critically during init
        setProducts(INITIAL_PRODUCTS);
        setSalesHistory(MOCK_SALES_HISTORY.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
      } finally {
        setIsLoadingData(false);
      }
    };
    loadData();
  }, [toast]);


  const addProduct = useCallback(async (newProductData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProductData,
      id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      price: parseFloat(String(newProductData.price)) || 0,
      stock: parseInt(String(newProductData.stock), 10) || 0,
      image: newProductData.image?.trim() || undefined,
      dataAiHint: newProductData.dataAiHint?.trim() || undefined,
    };
    try {
      await addProductDB(newProduct);
      setProducts(prevProducts => [...prevProducts, newProduct]);
      toast({ title: "¡Producto Añadido! 🎉", description: `${newProductData.name} ya está en la tienda.` });
    } catch (error) {
      console.error("Error adding product to DB:", error);
      toast({ title: "Error 😟", description: "No se pudo añadir el producto.", variant: "destructive" });
    }
  }, [toast]);

  const updateProduct = useCallback(async (productId: string, updatedProductData: Partial<Omit<Product, 'id'>>) => {
    const productToUpdate = products.find(p => p.id === productId);
    if (!productToUpdate) return;

    const updatedProduct: Product = {
      ...productToUpdate,
      ...updatedProductData,
      price: updatedProductData.price ? parseFloat(String(updatedProductData.price)) : productToUpdate.price,
      stock: updatedProductData.stock ? parseInt(String(updatedProductData.stock), 10) : productToUpdate.stock,
      image: updatedProductData.image === '' ? undefined : (updatedProductData.image || productToUpdate.image),
      dataAiHint: updatedProductData.dataAiHint === '' ? undefined : (updatedProductData.dataAiHint || productToUpdate.dataAiHint),
    };

    try {
      await updateProductDB(updatedProduct);
      setProducts(prevProducts =>
        prevProducts.map(p => (p.id === productId ? updatedProduct : p))
      );
      setCart(prevCart => prevCart.map(item =>
        item.product.id === productId
          ? { ...item, product: updatedProduct }
          : item
      ));
      toast({ title: "¡Producto Actualizado! 🛠️", description: "Cambios guardados correctamente." });
    } catch (error) {
      console.error("Error updating product in DB:", error);
      toast({ title: "Error 😟", description: "No se pudo actualizar el producto.", variant: "destructive" });
    }
  }, [products, toast]);

  const deleteProduct = useCallback(async (productId: string) => {
    try {
      await deleteProductDB(productId);
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
      setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
      toast({ title: "Producto Eliminado 🗑️", description: "El producto ha sido borrado." });
    } catch (error) {
      console.error("Error deleting product from DB:", error);
      toast({ title: "Error 😟", description: "No se pudo eliminar el producto.", variant: "destructive" });
    }
  }, [toast]);

  const addToCart = useCallback((product: Product) => {
    const productToAdd = products.find(p => p.id === product.id);
    if (!productToAdd) { return; }

    if (productToAdd.stock <= 0) {
      toast({ title: "¡Agotado! 😟", description: `${productToAdd.name} no está disponible actualmente.`, variant: "destructive" });
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.product.id === productToAdd.id);
      if (existingItem) {
        if (existingItem.quantity < productToAdd.stock) {
          return prevCart.map(item => item.product.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item);
        } else {
          toast({ title: "¡Máximo de existencias alcanzado! 🛒", description: `Has añadido todos los ${productToAdd.name} disponibles.`, variant: "destructive" });
          return prevCart;
        }
      } else {
        return [...prevCart, { product: productToAdd, quantity: 1 }];
      }
    });
  }, [products, toast]);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) => prevCart.filter(item => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, change: number) => {
    setCart((prevCart) => {
      return prevCart.map(item => {
        if (item.product.id === productId) {
          const newQuantity = item.quantity + change;
          if (newQuantity > item.product.stock) {
            toast({ title: "¡Existencias insuficientes! 😟", description: `Solo hay ${item.product.stock} ${item.product.name} disponibles.`, variant: "destructive" });
            return { ...item, quantity: item.product.stock };
          }
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  }, [toast]);

  const clearCart = useCallback(() => { setCart([]); }, []);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  const login = useCallback((role: 'admin' | 'staff') => {
    const userName = role === 'admin' ? 'Admin General' : 'Cajero/a';
    if (role === 'admin') {
      setUser({ id: 'user_admin_market', name: userName, role: 'admin' });
      setCurrentView('admin_dashboard');
    } else {
      setUser({ id: 'user_staff_market', name: userName, role: 'staff' });
      setCurrentView('staff_pos');
    }
    toast({ title: `¡Bienvenido/a, ${userName}! 🎉`, description: "¡Listo para empezar!" });
  }, [toast]);

  const logout = useCallback(() => {
    setUser(null);
    setCart([]);
    setCurrentView('login');
    toast({ title: "Sesión Cerrada 👋", description: "¡Hasta la próxima!" });
  }, [toast]);

  const createAccount = useCallback(async (name: string, initialBalance: number) => {
    const newAccount: Account = {
      id: `acc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      balance: initialBalance,
      qrCode: `ACC_${name.toUpperCase().replace(/\s+/g, '_')}_${Math.floor(Math.random() * 1000)}`
    };
    try {
      await addAccountDB(newAccount);
      setAccounts(prev => [...prev, newAccount]);
      toast({ title: "¡Cuenta Creada! 🎉", description: `Billetera para ${name} lista.` });
    } catch (error) {
      console.error("Error creating account:", error);
      toast({ title: "Error 😟", description: "No se pudo crear la cuenta.", variant: "destructive" });
    }
  }, [toast]);

  const topUpAccount = useCallback(async (accountId: string, amount: number) => {
    const account = accounts.find(a => a.id === accountId);
    if (!account) return;

    const updatedAccount = { ...account, balance: account.balance + amount };
    try {
      await updateAccountDB(updatedAccount);
      setAccounts(prev => prev.map(a => a.id === accountId ? updatedAccount : a));
      toast({ title: "¡Recarga Exitosa! 💰", description: `Se añadieron $${amount} a ${account.name}.` });
    } catch (error) {
      console.error("Error updating account:", error);
      toast({ title: "Error 😟", description: "No se pudo recargar la cuenta.", variant: "destructive" });
    }
  }, [accounts, toast]);

  const recordSale = useCallback(async (paymentMethod: 'Card' | 'Cash' | 'QR', qrCode?: string): Promise<boolean> => {
    if (paymentMethod === 'QR' && qrCode) {
      const account = accounts.find(a => a.qrCode === qrCode);
      if (!account) {
        toast({ title: "¡Error! ❌", description: "Código QR no válido.", variant: "destructive" });
        return false;
      }
      if (account.balance < cartTotal) {
        toast({ title: "¡Saldo Insuficiente! 💸", description: `Saldo actual: $${account.balance.toFixed(2)}`, variant: "destructive" });
        return false;
      }

      // Deduct from account
      const updatedAccount = { ...account, balance: account.balance - cartTotal };
      try {
        await updateAccountDB(updatedAccount);
        setAccounts(prev => prev.map(a => a.id === account.id ? updatedAccount : a));
      } catch (error) {
        console.error("Error deducting balance:", error);
        toast({ title: "Error 😟", description: "Error al procesar el pago QR.", variant: "destructive" });
        return false;
      }
    }

    const newSale: SaleRecord = {
      id: `sale_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      total: cartTotal,
      items: cart.reduce((sum, item) => sum + item.quantity, 0),
      paymentMethod: paymentMethod as 'Card' | 'Cash', // Cast for now, maybe update type later if needed strictly
      details: cart
    };

    const updatedProductsStock: Product[] = [];
    const productUpdatesPromises: Promise<void>[] = [];

    const tempProducts = products.map(p => {
      const cartItem = cart.find(ci => ci.product.id === p.id);
      if (cartItem) {
        const updatedP = { ...p, stock: p.stock - cartItem.quantity };
        updatedProductsStock.push(updatedP);
        productUpdatesPromises.push(updateProductDB(updatedP)); // Update stock in DB
        return updatedP;
      }
      return p;
    });

    try {
      await Promise.all(productUpdatesPromises); // Wait for all stock updates
      await addSaleRecordDB(newSale); // Add sale to DB

      setProducts(tempProducts); // Update products state
      setSalesHistory(prev => [newSale, ...prev].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())); // Update sales history state
      clearCart();
      return true;
    } catch (error) {
      console.error("Error recording sale or updating stock in DB:", error);
      toast({ title: "Error en Venta 😟", description: "No se pudo registrar la venta o actualizar el stock.", variant: "destructive" });
      return false;
    }
  }, [accounts, cart, cartTotal, clearCart, products, toast]);


  const value = useMemo(() => ({
    user, login, logout,
    cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal,
    currentView, setCurrentView,
    salesHistory, recordSale,
    products, addProduct, updateProduct, deleteProduct,
    isLoadingData,
    accounts, createAccount, topUpAccount,
    cashierDifficulty, setCashierDifficulty
  }), [
    user, login, logout,
    cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal,
    currentView, setCurrentView,
    salesHistory, recordSale,
    products, addProduct, updateProduct, deleteProduct,
    isLoadingData,
    accounts, createAccount, topUpAccount,
    cashierDifficulty, setCashierDifficulty
  ]);

  return <KiddieMartContext.Provider value={value}>{children}</KiddieMartContext.Provider>;
};

export const useKiddieMart = () => {
  const context = useContext(KiddieMartContext);
  if (context === undefined) {
    throw new Error('useKiddieMart must be used within a KiddieMartProvider');
  }
  return context;
};
