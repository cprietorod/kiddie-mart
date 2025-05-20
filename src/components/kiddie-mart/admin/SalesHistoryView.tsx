
"use client";
import { useKiddieMart } from '@/context/KiddieMartContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ReceiptText, CalendarDays, ShoppingBag, CreditCard, DollarSign } from 'lucide-react';

export function SalesHistoryView() {
  const { salesHistory } = useKiddieMart();

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-3xl font-bold text-primary flex items-center">
        <ReceiptText className="mr-3 h-8 w-8 text-accent" /> Historial de Ventas
      </h1>
      <Card className="shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-card-foreground/5 p-4">
            <CardTitle className="text-xl text-primary">Todas las Transacciones</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-220px)] md:h-auto md:max-h-[calc(100vh-280px)]">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="min-w-[180px]">
                    <CalendarDays className="inline-block mr-1 h-4 w-4 text-muted-foreground" /> Fecha y Hora
                  </TableHead>
                  <TableHead className="text-center">
                    <ShoppingBag className="inline-block mr-1 h-4 w-4 text-muted-foreground" /> Artículos
                  </TableHead>
                  <TableHead>Pago</TableHead>
                  <TableHead className="text-right min-w-[100px]">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesHistory.length > 0 ? (
                  salesHistory.map(sale => (
                    <TableRow key={sale.id} className="hover:bg-accent/10">
                      <TableCell className="text-muted-foreground text-sm">{new Date(sale.timestamp).toLocaleString('es-ES')}</TableCell>
                      <TableCell className="text-center font-medium">{sale.items}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sale.paymentMethod === 'Card' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                          {sale.paymentMethod === 'Card' ? 
                            <CreditCard className="mr-1.5 h-3.5 w-3.5" /> : 
                            <DollarSign className="mr-1.5 h-3.5 w-3.5" />
                          }
                          {sale.paymentMethod === 'Card' ? 'Tarjeta' : 'Efectivo'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-bold text-primary">${sale.total.toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center h-32 text-muted-foreground text-lg">
                    ¡Aún no se han registrado ventas! ¡Hagamos algunas! 💰🚀
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
