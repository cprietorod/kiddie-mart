
"use client";
import { useMemo } from 'react';
import { useKiddieMart } from '@/context/KiddieMartContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { TrendingUp, AlertCircle } from 'lucide-react';

import { useTranslations } from 'next-intl';

const CHART_COLORS = {
  sales: "hsl(var(--chart-1))",
  cash: "hsl(var(--chart-2))",
  card: "hsl(var(--chart-3))",
};

const salesByDayConfig = {
  sales: {
    label: "Sales ($)", // Will be dynamic, but config keys need to be static or updated via a component abstraction. For now, we will handle labels in the JSX.
    color: CHART_COLORS.sales,
  },
} satisfies ChartConfig;

const salesByPaymentMethodConfig = {
  Cash: {
    label: "Cash ($)",
    color: CHART_COLORS.cash,
  },
  Card: {
    label: "Card ($)",
    color: CHART_COLORS.card,
  },
} satisfies ChartConfig;


export function ReportsDashboardView() {
  const { salesHistory } = useKiddieMart();
  const t = useTranslations('Admin.Reports');

  const salesByDay = useMemo(() => {
    const data = salesHistory.reduce((acc, sale) => {
      const date = new Date(sale.timestamp).toLocaleDateString('en-CA'); // YYYY-MM-DD for sorting
      acc[date] = (acc[date] || 0) + sale.total;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(data)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([dateStr, sales]) => ({
        name: new Date(dateStr + 'T12:00:00').toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
        sales
      }))
      .slice(-10);
  }, [salesHistory]);

  const salesByPaymentMethod = useMemo(() => {
    const data = salesHistory.reduce((acc, sale) => {
      // Use keys that match our config keys 'Cash' and 'Card' 
      const methodKey = sale.paymentMethod === 'Cash' ? 'Cash' : 'Card';
      acc[methodKey] = (acc[methodKey] || 0) + sale.total;
      return acc;
    }, {} as Record<string, number>);

    // Map to translated names for display if needed, but the ChartConfig handles the legend. 
    // Actually, Recharts with "name" key uses that for the legend.
    // Let's use the translated names for the "name" property to show in Tooltip/Legend
    return Object.entries(data).map(([key, value]) => ({
      name: key === 'Cash' ? t('methodsChart.cash') : t('methodsChart.card'),
      value,
      // We keep the original key to match config if needed, but here we are using a custom cell map in the JSX anyway.
      originalKey: key
    }));
  }, [salesHistory, t]);

  const NoDataPlaceholder = ({ message = t('noData') }) => (
    <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-10">
      <AlertCircle className="h-12 w-12 text-primary/50 mb-3" />
      <p className="text-center">{message}</p>
    </div>
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-3xl font-bold text-primary flex items-center">
        <TrendingUp className="mr-3 h-8 w-8 text-accent" /> {t('title')}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl text-primary">{t('salesChart.title')}</CardTitle>
            <CardDescription className="text-muted-foreground">{t('salesChart.desc')}</CardDescription>
          </CardHeader>
          <CardContent>
            {salesByDay.length > 0 ? (
              <ChartContainer config={salesByDayConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={salesByDay} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="hsl(var(--foreground)/0.7)" />
                    <YAxis tickFormatter={(value) => `$${value}`} tickLine={false} axisLine={false} stroke="hsl(var(--foreground)/0.7)" />
                    <Tooltip
                      content={<ChartTooltipContent
                        formatter={(value) => `$${Number(value).toFixed(2)}`}
                        indicator="dot"
                        labelFormatter={(label) => label} // Just show date
                      />}
                      cursor={{ fill: "hsl(var(--accent)/0.1)" }}
                    />
                    <Legend />
                    <Bar dataKey="sales" radius={[4, 4, 0, 0]} name={t('salesChart.label')}>
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
            <CardTitle className="text-xl text-primary">{t('methodsChart.title')}</CardTitle>
            <CardDescription className="text-muted-foreground">{t('methodsChart.desc')}</CardDescription>
          </CardHeader>
          <CardContent>
            {salesByPaymentMethod.length > 0 ? (
              <ChartContainer config={salesByPaymentMethodConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={salesByPaymentMethod} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
                    <XAxis type="number" tickFormatter={(value) => `$${value}`} hide={false} stroke="hsl(var(--foreground)/0.7)" />
                    <YAxis dataKey="name" type="category" width={80} tickLine={false} axisLine={false} stroke="hsl(var(--foreground)/0.7)" />
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
                        <Cell key={`cell-${entry.name}`} fill={entry.originalKey === 'Cash' ? CHART_COLORS.cash : CHART_COLORS.card} />
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
