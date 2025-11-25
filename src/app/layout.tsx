
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google'; // Changed font
import './globals.css';
import { Toaster } from '@/components/ui/toaster'; // Added for notifications

const nunito = Nunito({ // Changed font
  subsets: ['latin'],
  variable: '--font-nunito', // Changed font variable
});

export const metadata: Metadata = {
  title: 'Mini Market POS', // Updated title
  description: 'Un Punto de Venta simple y amigable para tu tienda.', // Updated description
  manifest: '/manifest.json',
  themeColor: '#A7E6D1',
};

import NetworkStatus from '@/components/NetworkStatus';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${nunito.variable} font-sans antialiased`}> {/* Use Nunito font variable */}
        {children}
        <NetworkStatus />
        <Toaster />
      </body>
    </html>
  );
}
