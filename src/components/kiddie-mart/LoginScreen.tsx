
"use client";
import { useKiddieMart } from '@/context/KiddieMartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, UserCog, Zap } from 'lucide-react';
import Image from 'next/image';

export function LoginScreen() {
  const { login } = useKiddieMart();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-blue-200 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-3xl overflow-hidden transform transition-all hover:scale-105 duration-300">
        <CardHeader className="bg-primary text-primary-foreground p-8 text-center">
          <Image 
            src="https://placehold.co/120x120.png" 
            alt="Logo de Mini Market" 
            width={100} 
            height={100} 
            className="mx-auto mb-4 rounded-full border-4 border-accent shadow-lg"
            data-ai-hint="store logo shopping cart"
          />
          <CardTitle className="text-4xl font-bold flex items-center justify-center gap-2">
            <Zap className="h-10 w-10 text-accent animate-pulse" />
            Mini Market
          </CardTitle>
          <CardDescription className="text-primary-foreground/80 text-lg mt-2">
            ¡Bienvenido/a! Gestiona tu tienda fácilmente.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <Button 
            onClick={() => login('staff')} 
            size="lg" 
            className="w-full text-xl py-8 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform hover:scale-105 transition-transform duration-200"
          >
            <User className="mr-3 h-8 w-8" /> ¡Soy Cajero/a!
          </Button>
          <Button 
            onClick={() => login('admin')} 
            variant="secondary" 
            size="lg" 
            className="w-full text-xl py-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200"
          >
            <UserCog className="mr-3 h-8 w-8" /> ¡Soy el/la Gerente!
          </Button>
        </CardContent>
      </Card>
      <p className="mt-8 text-center text-foreground/70">
        Mini Market - ¡Tu tienda amiga!
      </p>
    </div>
  );
}
