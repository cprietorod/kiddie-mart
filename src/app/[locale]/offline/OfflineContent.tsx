"use client";
import React from 'react';
import { WifiOff } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function OfflineContent() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
            <div className="bg-muted p-6 rounded-full mb-6">
                <WifiOff className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-2">¡Estás Offline!</h1>
            <p className="text-muted-foreground mb-8 max-w-md">
                Parece que no tienes conexión a internet. No te preocupes, puedes seguir usando la aplicación con los datos guardados.
            </p>
            <div className="flex gap-4">
                <Button asChild>
                    <Link href="/">
                        Ir al Inicio
                    </Link>
                </Button>
                <Button variant="outline" onClick={() => window.location.reload()}>
                    Reintentar
                </Button>
            </div>
        </div>
    );
}
