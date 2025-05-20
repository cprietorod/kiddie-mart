
"use client";
import { useMemo } from 'react';
import { useKiddieMart } from '@/context/KiddieMartContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { TrendingUp, AlertCircle } from 'lucide-react';

const CHART_COLORS = {
  sales: "hsl(var(--chart-1))", 
  cash: "hsl(var(--chart-2))",
  card: "hsl(var(--chart-3))",
};

const salesByDayConfig = {
  sales: {
    label: "Ventas Diarias ($)",
    color: CHART_COLORS.sales,
  },
} satisfies ChartConfig;

const salesByPaymentMethodConfig = {
  Cash: {
    label: "Efectivo ($)",
    color: CHART_COLORS.cash,
  },
  Card: {
    label: "Tarjeta ($)",
    color: CHART_COLORS.card,
  },
} satisfies ChartConfig;


export function ReportsDashboardView() {
  const { salesHistory } = useKiddieMart();

  const salesByDay = useMemo(() => {
    const data = salesHistory.reduce((acc, sale) => {
      const date = new Date(sale.timestamp).toLocaleDateString('en-CA'); // YYYY-MM-DD for sorting
      acc[date] = (acc[date] || 0) + sale.total;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(data)
      .map(([name, sales]) => ({ name: new Date(name).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }), sales }))
      .sort((a, b) => {
         const dateA = new Date(a.name.replace(/(\\d+)\\s(\\w+)/, '$2 $1')); 
         const dateB = new Date(b.name.replace(/(\\d+)\\s(\\w+)/, '$2 $1'));
         return new Date(name).getTime() - new Date(name).getTime(); // Corrected sort for date strings
      })
      .slice(-10); 
  }, [salesHistory]);

  const salesByPaymentMethod = useMemo(() => {
    const data = salesHistory.reduce((acc, sale) => {
      const paymentMethodLabel = sale.paymentMethod === 'Cash' ? 'Efectivo' : 'Tarjeta';
      acc[paymentMethodLabel] = (acc[paymentMethodLabel] || 0) + sale.total;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(data).map(([name, value]) => ({ name, value }));
  }, [salesHistory]);

  const NoDataPlaceholder = ({ message = "¡Aún no hay suficientes datos para este gráfico! 📊" }) => (
    <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-10">
      <AlertCircle className="h-12 w-12 text-primary/50 mb-3" />
      <p className="text-center">{message}</p>
    </div>
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-3xl font-bold text-primary flex items-center">
        <TrendingUp className="mr-3 h-8 w-8 text-accent" /> Reportes de la Tienda
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Ventas a lo Largo del Tiempo</CardTitle>
            <CardDescription className="text-muted-foreground">Ingresos generados cada día.</CardDescription>
          </CardHeader>
          <CardContent>
            {salesByDay.length > 0 ? (
              <ChartContainer config={salesByDayConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={salesByDay} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="hsl(var(--foreground)/0.7)"/>
                    <YAxis tickFormatter={(value) => `$${value}`} tickLine={false} axisLine={false} stroke="hsl(var(--foreground)/0.7)"/>
                    <Tooltip
                      content={<ChartTooltipContent
                        formatter={(value) => `$${Number(value).toFixed(2)}`}
                        indicator="dot"
                      />}
                      cursor={{ fill: "hsl(var(--accent)/0.1)" }}
                    />
                    <Legend />
                    <Bar dataKey="sales" radius={[4, 4, 0, 0]}>
                       {salesByDay.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS.sales} />
                      ))}
                    </Bar>
                  </RechartsBarChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <NoDataPlaceholder />
            )}
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Métodos de Pago</CardTitle>
            <CardDescription className="text-muted-foreground">Cómo los clientes pagan por sus productos.</CardDescription>
          </CardHeader>
          <CardContent>
            {salesByPaymentMethod.length > 0 ? (
              <ChartContainer config={salesByPaymentMethodConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={salesByPaymentMethod} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
                    <XAxis type="number" tickFormatter={(value) => `$${value}`} hide={false} stroke="hsl(var(--foreground)/0.7)"/>
                    <YAxis dataKey="name" type="category" width={80} tickLine={false} axisLine={false} stroke="hsl(var(--foreground)/0.7)"/>
                    <Tooltip
                      content={<ChartTooltipContent
                        formatter={(value) => `$${Number(value).toFixed(2)}`}
                        indicator="dot"
                      />}
                       cursor={{ fill: "hsl(var(--accent)/0.1)" }}
                    />
                    <Legend />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {salesByPaymentMethod.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={salesByPaymentMethodConfig[entry.name as keyof typeof salesByPaymentMethodConfig]?.color || CHART_COLORS.sales} />
                      ))}
                    </Bar>
                  </RechartsBarChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <NoDataPlaceholder />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
