"use client";
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, PartyPopper, Frown } from 'lucide-react';

interface MathChallengeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    problem: string;
    correctAnswer: number;
}

export function MathChallengeModal({ isOpen, onClose, onSuccess, problem, correctAnswer }: MathChallengeModalProps) {
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        if (isOpen) {
            setUserAnswer('');
            setFeedback('none');
            setAttempts(0);
        }
    }, [isOpen]);

    const handleSubmit = () => {
        const numAnswer = parseFloat(userAnswer);
        if (isNaN(numAnswer)) return;

        // Allow small floating point differences
        if (Math.abs(numAnswer - correctAnswer) < 0.01) {
            setFeedback('correct');
            setTimeout(() => {
                onSuccess();
                onClose();
            }, 1500);
        } else {
            setFeedback('incorrect');
            setAttempts(prev => prev + 1);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md bg-background rounded-2xl shadow-2xl border-4 border-primary">
                <DialogHeader className="bg-primary/10 -mx-6 -mt-6 p-6 rounded-t-xl flex flex-col items-center">
                    <Calculator className="h-12 w-12 text-primary mb-2 animate-bounce" />
                    <DialogTitle className="text-2xl font-bold text-center text-primary">¡Desafío Matemático!</DialogTitle>
                </DialogHeader>

                <div className="p-4 space-y-6 text-center">
                    <div className="bg-muted p-6 rounded-xl">
                        <p className="text-xl font-medium text-muted-foreground mb-2">Resuelve para continuar:</p>
                        <p className="text-3xl font-bold text-foreground">{problem}</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="answer" className="sr-only">Tu Respuesta</Label>
                        <Input
                            id="answer"
                            type="number"
                            placeholder="Escribe tu respuesta aquí..."
                            value={userAnswer}
                            onChange={(e) => {
                                setUserAnswer(e.target.value);
                                setFeedback('none');
                            }}
                            className="text-center text-2xl h-14 rounded-xl border-2 border-primary/20 focus:border-primary focus:ring-primary"
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        />
                    </div>

                    {feedback === 'correct' && (
                        <div className="flex items-center justify-center gap-2 text-green-600 animate-in zoom-in duration-300">
                            <PartyPopper className="h-6 w-6" />
                            <span className="text-lg font-bold">¡Correcto! ¡Muy bien!</span>
                        </div>
                    )}

                    {feedback === 'incorrect' && (
                        <div className="flex items-center justify-center gap-2 text-destructive animate-in shake duration-300">
                            <Frown className="h-6 w-6" />
                            <span className="text-lg font-bold">¡Inténtalo de nuevo!</span>
                        </div>
                    )}
                </div>

                <DialogFooter className="sm:justify-center">
                    <Button
                        onClick={handleSubmit}
                        size="lg"
                        className="w-full text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg transform active:scale-95 transition-all"
                        disabled={feedback === 'correct'}
                    >
                        Comprobar Respuesta
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
