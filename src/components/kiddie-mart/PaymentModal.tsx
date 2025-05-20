
"use client";
import { useEffect, useState } from 'react';
import { useKiddieMart } from '@/context/KiddieMartContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, DollarSign, PartyPopper, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
}

export function PaymentModal({ isOpen, onClose, totalAmount }: PaymentModalProps) {
  const { recordSale } = useKiddieMart();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<'Card' | 'Cash'>('Card');
  const [cashReceived, setCashReceived] = useState('');
  const [changeDue, setChangeDue] = useState(0);
  const [showProcessing, setShowProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [cardTap, setCardTap] = useState(false);

  useEffect(() => {
    if (paymentMethod === 'Cash' && cashReceived) {
      const received = parseFloat(cashReceived);
      if (!isNaN(received) && received >= totalAmount) {
        setChangeDue(received - totalAmount);
      } else {
        setChangeDue(0);
      }
    } else {
      setChangeDue(0);
    }
  }, [cashReceived, paymentMethod, totalAmount]);

  useEffect(() => {
    if (isOpen) { // Reset state when modal opens
      setPaymentMethod('Card');
      setCashReceived('');
      setChangeDue(0);
      setShowProcessing(false);
      setShowSuccess(false);
      setCardTap(false);
    }
  }, [isOpen]);

  const handleConfirmPayment = () => {
    if (paymentMethod === 'Cash') {
      const received = parseFloat(cashReceived);
      if (isNaN(received) || received < totalAmount) {
        toast({ title: "¡Uy! 💰", description: "Por favor, ingresa suficiente dinero.", variant: "destructive" });
        return;
      }
    }

    if(paymentMethod === 'Card') {
      setCardTap(true);
      setTimeout(() => setCardTap(false), 300);
    }

    setShowProcessing(true);
    setTimeout(() => {
      recordSale(paymentMethod);
      setShowProcessing(false);
      setShowSuccess(true);
      toast({
        title: "¡Pago Completo! 🎉",
        description: "¡Buen trabajo! Tus productos están en camino.",
        duration: 3000,
      });
      setTimeout(() => {
        onClose();
      }, 2500); // Auto close after success message + toast
    }, 1500); // Simulate processing
  };
  
  const handleModalOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalOpenChange}>
      <DialogContent className="sm:max-w-lg bg-background rounded-2xl shadow-2xl p-0">
        <DialogHeader className="p-6 pb-4 bg-primary rounded-t-2xl">
          <DialogTitle className="text-2xl font-bold text-center text-primary-foreground">¡A Pagar!</DialogTitle>
        </DialogHeader>
        <div className="p-6">
        {showProcessing ? (
          <div className="text-center p-8 space-y-4">
            <Loader2 className="h-16 w-16 text-primary mx-auto animate-spin" />
            <p className="text-lg font-medium text-foreground">Procesando pago...</p>
          </div>
        ) : showSuccess ? (
          <div className="text-center p-8 space-y-4">
            <PartyPopper className="h-20 w-20 text-accent mx-auto animate-bounce" />
            <p className="text-2xl font-semibold text-primary">¡Todo Listo! ¡Sí!</p>
            {paymentMethod === 'Cash' && changeDue > 0 && (
              <p className="mt-2 text-lg text-muted-foreground">Tu cambio: <span className="font-bold text-green-500">${changeDue.toFixed(2)}</span></p>
            )}
            <p className="text-sm text-muted-foreground">¡Gracias por tu compra!</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground">Necesitas pagar:</p>
              <p className="text-5xl font-extrabold text-primary">${totalAmount.toFixed(2)}</p>
            </div>

            <div className="flex justify-center space-x-3">
              <Button
                variant={paymentMethod === 'Card' ? 'default' : 'outline'}
                onClick={() => setPaymentMethod('Card')}
                className={`py-6 px-4 rounded-xl text-lg shadow-md transition-all ${paymentMethod === 'Card' ? 'bg-accent text-accent-foreground ring-2 ring-accent-foreground' : 'border-primary text-primary hover:bg-primary/10'}`}
              >
                <CreditCard className="mr-2 h-6 w-6" /> Tarjeta
              </Button>
              <Button
                variant={paymentMethod === 'Cash' ? 'default' : 'outline'}
                onClick={() => setPaymentMethod('Cash')}
                className={`py-6 px-4 rounded-xl text-lg shadow-md transition-all ${paymentMethod === 'Cash' ? 'bg-accent text-accent-foreground ring-2 ring-accent-foreground' : 'border-primary text-primary hover:bg-primary/10'}`}
              >
                <DollarSign className="mr-2 h-6 w-6" /> Efectivo
              </Button>
            </div>

            {paymentMethod === 'Cash' && (
              <div className="space-y-2 animate-fadeIn">
                <Label htmlFor="cashReceived" className="text-base font-medium text-foreground">Efectivo Recibido:</Label>
                <Input
                  name="cashReceived"
                  type="number"
                  placeholder="ej: 50"
                  value={cashReceived}
                  onChange={(e) => setCashReceived(e.target.value)}
                  min={totalAmount > 0 ? totalAmount.toFixed(2) : "0.01"}
                  step="0.01"
                  className="h-12 text-lg rounded-lg shadow-sm focus:ring-accent"
                />
                {cashReceived && parseFloat(cashReceived) >= totalAmount && (
                  <p className="text-sm text-green-600">Cambio: ${changeDue.toFixed(2)}</p>
                )}
                {cashReceived && parseFloat(cashReceived) < totalAmount && (
                  <p className="text-sm text-destructive">¡Dinero insuficiente!</p>
                )}
              </div>
            )}

            {paymentMethod === 'Card' && (
              <div className={`text-center p-4 border-2 border-dashed border-primary/50 rounded-lg bg-primary/10 animate-fadeIn ${cardTap ? 'animate-card-tap': ''}`}>
                <Image src="https://placehold.co/100x64/FFD700/334155.png?text=TAP!" alt="Tocar tarjeta" width={100} height={64} className="mx-auto" data-ai-hint="credit card tap"/>
                <p className="text-sm text-primary mt-2">¡Toca la tarjeta para pagar!</p>
              </div>
            )}
            
            <DialogFooter className="pt-6 flex flex-col-reverse gap-2 md:flex-row md:justify-end md:gap-2 md:flex-wrap">
              <DialogClose asChild>
                <Button variant="outline" className="w-full md:w-auto py-3 rounded-lg text-base border-muted-foreground text-muted-foreground hover:border-primary hover:text-primary">Cancelar</Button>
              </DialogClose>
              <Button 
                onClick={handleConfirmPayment} 
                disabled={paymentMethod === 'Cash' && (cashReceived === '' || parseFloat(cashReceived) < totalAmount)}
                className="w-full md:w-auto py-3 rounded-lg text-base bg-green-500 hover:bg-green-600 text-white shadow-lg"
              >
                ¡Pagar Ahora!
              </Button>
            </DialogFooter>
          </div>
        )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
