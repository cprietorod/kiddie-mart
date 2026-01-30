import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import NetworkStatus from '@/components/NetworkStatus';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: 'Mini Market POS',
  description: 'Un Punto de Venta simple y amigable para tu tienda.',
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#A7E6D1',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${nunito.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <NetworkStatus />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
