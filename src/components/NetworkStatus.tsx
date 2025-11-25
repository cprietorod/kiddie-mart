"use client";

import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

const NetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        // Set initial state
        setIsOnline(navigator.onLine);

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (isOnline) {
        return null;
    }

    return (
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 bg-destructive text-destructive-foreground px-4 py-2 rounded-full shadow-lg animate-in fade-in slide-in-from-bottom-4">
            <WifiOff className="h-4 w-4" />
            <span className="text-sm font-medium">Estás desconectado. Trabajando offline.</span>
        </div>
    );
};

export default NetworkStatus;
