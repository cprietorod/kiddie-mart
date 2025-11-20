"use client";
import { useState } from 'react';
import { useKiddieMart } from '@/context/KiddieMartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Wallet, Plus, QrCode, DollarSign, CreditCard } from 'lucide-react';
import Image from 'next/image';

export function AdminWalletManagement() {
    const { accounts, createAccount, topUpAccount } = useKiddieMart();
    const [newAccountName, setNewAccountName] = useState('');
    const [initialBalance, setInitialBalance] = useState('');
    const [topUpAmount, setTopUpAmount] = useState('');
    const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

    const handleCreateAccount = () => {
        if (newAccountName && initialBalance) {
            createAccount(newAccountName, parseFloat(initialBalance));
            setNewAccountName('');
            setInitialBalance('');
        }
    };

    const handleTopUp = (accountId: string) => {
        if (topUpAmount) {
            topUpAccount(accountId, parseFloat(topUpAmount));
            setTopUpAmount('');
            setSelectedAccount(null);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-primary flex items-center gap-2">
                    <Wallet className="h-8 w-8" /> Gestión de Billeteras
                </h2>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-green-500 hover:bg-green-600 text-white">
                            <Plus className="mr-2 h-4 w-4" /> Nueva Billetera
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Crear Nueva Billetera</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Nombre del Niño/a</Label>
                                <Input
                                    value={newAccountName}
                                    onChange={(e) => setNewAccountName(e.target.value)}
                                    placeholder="Ej: Sofía"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Saldo Inicial ($)</Label>
                                <Input
                                    type="number"
                                    value={initialBalance}
                                    onChange={(e) => setInitialBalance(e.target.value)}
                                    placeholder="Ej: 50.00"
                                />
                            </div>
                            <Button onClick={handleCreateAccount} className="w-full">Crear Cuenta</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accounts.map((account) => (
                    <Card key={account.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
                            <CardTitle className="flex justify-between items-center">
                                {account.name}
                                <CreditCard className="h-5 w-5 opacity-80" />
                            </CardTitle>
                            <CardDescription className="text-white/80 font-mono text-xs">
                                ID: {account.qrCode}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 text-center">
                            <div className="mb-4">
                                <p className="text-sm text-muted-foreground">Saldo Actual</p>
                                <p className="text-4xl font-bold text-green-600">${account.balance.toFixed(2)}</p>
                            </div>

                            <div className="flex justify-center mb-4 bg-white p-2 rounded-lg border-2 border-dashed border-gray-200">
                                {/* Simulated QR Code */}
                                <div className="relative h-32 w-32">
                                    <Image
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${account.qrCode}`}
                                        alt="QR Code"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground mb-4">Escanea este código para pagar</p>

                            <div className="flex gap-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="w-full" onClick={() => setSelectedAccount(account.id)}>
                                            <DollarSign className="mr-2 h-4 w-4" /> Recargar
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Recargar Billetera de {account.name}</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4 py-4">
                                            <div className="space-y-2">
                                                <Label>Monto a Recargar ($)</Label>
                                                <Input
                                                    type="number"
                                                    value={topUpAmount}
                                                    onChange={(e) => setTopUpAmount(e.target.value)}
                                                    placeholder="Ej: 10.00"
                                                />
                                            </div>
                                            <Button onClick={() => handleTopUp(account.id)} className="w-full bg-green-500 hover:bg-green-600">
                                                Confirmar Recarga
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {accounts.length === 0 && (
                    <div className="col-span-full text-center p-12 border-2 border-dashed rounded-xl text-muted-foreground">
                        <Wallet className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No hay billeteras creadas aún.</p>
                        <p className="text-sm">Crea una nueva para empezar.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
