import { useEffect, useState } from 'react';
import { useKiddieMart } from '@/context/KiddieMartContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, DollarSign, PartyPopper, Loader2, Calculator, QrCode, Scan, Camera, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';
import { Scanner } from '@yudiel/react-qr-scanner';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
}

export function PaymentModal({ isOpen, onClose, totalAmount }: PaymentModalProps) {
  const { recordSale, cashierDifficulty } = useKiddieMart();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<'Card' | 'Cash' | 'QR'>('Card');
  const [cashReceived, setCashReceived] = useState('');
  const [manualChange, setManualChange] = useState(''); // For Primary Mode
  const [qrCodeInput, setQrCodeInput] = useState('');
  const [changeDue, setChangeDue] = useState(0);
  const [showProcessing, setShowProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [cardTap, setCardTap] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

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
      setManualChange('');
      setQrCodeInput('');
      setChangeDue(0);
      setShowProcessing(false);
      setShowSuccess(false);
      setCardTap(false);
      setIsScanning(false);
    }
  }, [isOpen]);

  const handleConfirmPayment = async () => {
    if (paymentMethod === 'Cash') {
      const received = parseFloat(cashReceived);
      if (isNaN(received) || received < totalAmount) {
        toast({ title: "¡Uy! 💰", description: "Por favor, ingresa suficiente dinero.", variant: "destructive" });
        return;
      }

      // Primary Mode Challenge: Verify Manual Change
      if (cashierDifficulty === 'primary') {
        const userChange = parseFloat(manualChange);
        const actualChange = received - totalAmount;

        if (isNaN(userChange) || Math.abs(userChange - actualChange) > 0.01) {
          toast({
            title: "¡Cálculo Incorrecto! 🧮",
            description: "El cambio no es correcto. ¡Inténtalo de nuevo!",
            variant: "destructive"
          });
          return;
        }
      }
    }

    if (paymentMethod === 'QR') {
      if (!qrCodeInput.trim()) {
        toast({ title: "¡Falta el código! 📱", description: "Por favor, escanea o escribe el código QR.", variant: "destructive" });
        return;
      }
    }

    if (paymentMethod === 'Card') {
      setCardTap(true);
      setTimeout(() => setCardTap(false), 300);
    }

    setShowProcessing(true);
    try {
      // Artificial delay for effect
      await new Promise(resolve => setTimeout(resolve, 1500));

      const success = await recordSale(paymentMethod, paymentMethod === 'QR' ? qrCodeInput : undefined);

      if (success) {
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
      } else {
        setShowProcessing(false);
        // Toast is already handled in recordSale for specific errors
      }
    } catch (error) {
      setShowProcessing(false);
      console.error("Payment error:", error);
      toast({ title: "Error", description: "Hubo un problema procesando el pago.", variant: "destructive" });
    }
  };

  const handleModalOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleScan = (data: any) => {
    if (data) {
      const text = data.text || data; // Handle object or string
      setQrCodeInput(text);
      setIsScanning(false);
      toast({
        title: "¡Código Detectado! 📸",
        description: `Leído: ${text}`,
      });
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    // Optional: toast error if critical, but camera errors can be frequent (e.g. no permission)
  };

  const handleStartScan = () => {
    if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setIsScanning(true);
    } else {
      toast({
        title: "Cámara no disponible 🚫",
        description: "Tu navegador no soporta acceso a la cámara o la conexión no es segura (HTTPS).",
        variant: "destructive"
      });
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

              <div className="flex justify-center space-x-2">
                <Button
                  variant={paymentMethod === 'Card' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('Card')}
                  className={`flex-1 py-6 rounded-xl text-base shadow-md transition-all ${paymentMethod === 'Card' ? 'bg-accent text-accent-foreground ring-2 ring-accent-foreground' : 'border-primary text-primary hover:bg-primary/10'}`}
                >
                  <CreditCard className="mr-2 h-5 w-5" /> Tarjeta
                </Button>
                <Button
                  variant={paymentMethod === 'Cash' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('Cash')}
                  className={`flex-1 py-6 rounded-xl text-base shadow-md transition-all ${paymentMethod === 'Cash' ? 'bg-accent text-accent-foreground ring-2 ring-accent-foreground' : 'border-primary text-primary hover:bg-primary/10'}`}
                >
                  <DollarSign className="mr-2 h-5 w-5" /> Efectivo
                </Button>
                <Button
                  variant={paymentMethod === 'QR' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('QR')}
                  className={`flex-1 py-6 rounded-xl text-base shadow-md transition-all ${paymentMethod === 'QR' ? 'bg-accent text-accent-foreground ring-2 ring-accent-foreground' : 'border-primary text-primary hover:bg-primary/10'}`}
                >
                  <QrCode className="mr-2 h-5 w-5" /> QR
                </Button>
              </div>

              {paymentMethod === 'Cash' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-2">
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
                  </div>

                  {cashReceived && parseFloat(cashReceived) >= totalAmount && (
                    <>
                      {cashierDifficulty === 'preschool' ? (
                        <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                          <p className="text-sm text-green-800 font-medium">Cambio a entregar:</p>
                          <p className="text-3xl font-bold text-green-600">${changeDue.toFixed(2)}</p>
                        </div>
                      ) : (
                        <div className="space-y-2 p-4 bg-orange-50 rounded-xl border border-orange-200">
                          <div className="flex items-center gap-2 text-orange-800 mb-2">
                            <Calculator className="h-5 w-5" />
                            <span className="font-bold">¡Desafío de Cambio!</span>
                          </div>
                          <Label htmlFor="manualChange" className="text-sm text-orange-800">¿Cuánto cambio debes dar?</Label>
                          <Input
                            name="manualChange"
                            type="number"
                            placeholder="Calcula el cambio..."
                            value={manualChange}
                            onChange={(e) => setManualChange(e.target.value)}
                            className="h-12 text-lg rounded-lg shadow-sm border-orange-300 focus:ring-orange-500"
                          />
                        </div>
                      )}
                    </>
                  )}

                  {cashReceived && parseFloat(cashReceived) < totalAmount && (
                    <p className="text-sm text-destructive font-medium">¡Dinero insuficiente!</p>
                  )}
                </div>
              )}

              {paymentMethod === 'Card' && (
                <div className={`text-center p-4 border-2 border-dashed border-primary/50 rounded-lg bg-primary/10 animate-fadeIn ${cardTap ? 'animate-card-tap' : ''}`}>
                  <Image src="https://placehold.co/100x64/FFD700/334155.png?text=TAP!" alt="Tocar tarjeta" width={100} height={64} className="mx-auto" data-ai-hint="credit card tap" />
                  <p className="text-sm text-primary mt-2">¡Toca la tarjeta para pagar!</p>
                </div>
              )}

              {paymentMethod === 'QR' && (
                <div className="space-y-4 animate-fadeIn">
                  {!isScanning ? (
                    <>
                      <div className="text-center p-4 border-2 border-dashed border-primary/50 rounded-lg bg-primary/10">
                        <Button
                          variant="ghost"
                          className="h-auto flex flex-col items-center p-4 hover:bg-transparent"
                          onClick={handleStartScan}
                        >
                          <Scan className="h-12 w-12 text-primary mx-auto mb-2 animate-pulse" />
                          <p className="text-sm text-primary font-medium">Toca para escanear con cámara</p>
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="qrInput" className="text-base font-medium text-foreground">Código QR / ID de Billetera:</Label>
                        <div className="flex gap-2">
                          <Input
                            id="qrInput"
                            name="qrInput"
                            type="text"
                            placeholder="Escanea o escribe aquí..."
                            value={qrCodeInput}
                            onChange={(e) => setQrCodeInput(e.target.value)}
                            className="h-12 text-lg rounded-lg shadow-sm focus:ring-accent font-mono"
                            autoFocus
                          />
                          <Button
                            size="icon"
                            className="h-12 w-12 shrink-0"
                            onClick={handleStartScan}
                          >
                            <Camera className="h-5 w-5" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">Escanea el código del cliente o escribe su ID.</p>
                      </div>
                    </>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden bg-black h-[300px]">
                      <Scanner
                        onScan={(result) => {
                          if (result && result.length > 0) {
                            handleScan(result[0].rawValue);
                          }
                        }}
                        onError={(error) => {
                          console.log(error);
                        }}
                        components={{
                          onOff: false,
                          torch: false,
                          zoom: false,
                          finder: false,
                        }}
                        styles={{
                          container: { height: 300 }
                        }}
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2 rounded-full z-10"
                        onClick={() => setIsScanning(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm bg-black/50 py-2 z-10">
                        Apunta al código QR
                      </div>
                    </div>
                  )}
                </div>
              )}

              <DialogFooter className="pt-6 flex flex-col-reverse gap-2 md:flex-row md:justify-end md:gap-2 md:flex-wrap">
                <DialogClose asChild>
                  <Button variant="outline" className="w-full md:w-auto py-3 rounded-lg text-base border-muted-foreground text-muted-foreground hover:border-primary hover:text-primary">Cancelar</Button>
                </DialogClose>
                <Button
                  onClick={handleConfirmPayment}
                  disabled={
                    (paymentMethod === 'Cash' && (cashReceived === '' || parseFloat(cashReceived) < totalAmount)) ||
                    (paymentMethod === 'Cash' && cashierDifficulty === 'primary' && manualChange === '') ||
                    (paymentMethod === 'QR' && qrCodeInput === '')
                  }
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
