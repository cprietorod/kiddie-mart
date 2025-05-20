
"use client";
import { useState }  from 'react';
import { useKiddieMart } from '@/context/KiddieMartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingCartIcon, Trash2, Plus, Minus } from 'lucide-react';
import { PaymentModal } from './PaymentModal';
import Image from 'next/image';

export function ShoppingCart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useKiddieMart();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  return (
    <div className="h-full flex flex-col bg-muted border-l border-border rounded-r-2xl shadow-inner">
      <CardHeader className="p-4 border-b border-border flex justify-between items-center bg-background/70 backdrop-blur-sm sticky top-0 z-10">
        <CardTitle className="text-2xl font-bold flex items-center text-primary">
          <ShoppingCartIcon className="mr-3 h-7 w-7" /> Mi Bolsa
        </CardTitle>
        {cart.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearCart} className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full px-3">
            <Trash2 className="mr-1 h-4 w-4" /> Limpiar Todo
          </Button>
        )}
      </CardHeader>

      <ScrollArea className="flex-grow">
        <CardContent className="p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center text-muted-foreground py-10">
              <LocalShoppingBagIcon className="mx-auto h-16 w-16 text-primary/30 mb-4" />
              <p className="text-lg">¡Tu bolsa de compras está vacía!</p>
              <p className="text-sm">Añade algunos productos para empezar.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="flex items-center bg-card p-3 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 relative mr-3 flex-shrink-0">
                 {(item.product.image && (item.product.image.startsWith('http://') || item.product.image.startsWith('https://'))) ? (
                    <Image 
                        src={item.product.image} 
                        alt={item.product.name} 
                        fill 
                        sizes="64px"
                        className="rounded-md object-cover"
                        data-ai-hint={item.product.dataAiHint} 
                    />
                  ) : (
                    <span className="text-4xl flex items-center justify-center w-full h-full bg-primary/10 rounded-md" role="img" aria-label={item.product.category}>{item.product.emoji}</span>
                  )}
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-sm leading-tight">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">${item.product.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <div className="flex items-center space-x-1 mx-2">
                  <Button variant="outline" size="icon" className="h-7 w-7 rounded-full border-primary text-primary hover:bg-primary/10" onClick={() => updateQuantity(item.product.id, -1)}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                  <Button variant="outline" size="icon" className="h-7 w-7 rounded-full border-primary text-primary hover:bg-primary/10" onClick={() => updateQuantity(item.product.id, 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="ghost" size="icon" className="text-destructive/70 hover:text-destructive h-7 w-7 rounded-full" onClick={() => removeFromCart(item.product.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
                <p className="font-bold w-20 text-right text-sm text-primary-foreground ml-2">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))
          )}
        </CardContent>
      </ScrollArea>
      
      <CardFooter className="p-4 border-t border-border bg-background/70 backdrop-blur-sm mt-auto">
        <div className="w-full">
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg font-semibold text-foreground">Total:</span>
            <span className="text-2xl font-bold text-primary">${cartTotal.toFixed(2)}</span>
          </div>
          <Button 
            size="lg" 
            className="w-full text-lg py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg focus:ring-primary" 
            onClick={() => setIsPaymentModalOpen(true)} 
            disabled={cart.length === 0}
          >
            ¡Hora de Pagar! 🛍️
          </Button>
        </div>
      </CardFooter>
      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} totalAmount={cartTotal} />
    </div>
  );
}

// Renamed to avoid conflict if ShoppingBagIcon is imported from lucide-react later
const LocalShoppingBagIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);
