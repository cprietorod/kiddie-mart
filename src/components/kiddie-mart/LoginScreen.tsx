"use client";
import { useKiddieMart } from '@/context/KiddieMartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, UserCog, Zap, Baby, School } from 'lucide-react';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export function LoginScreen() {
  const { login, cashierDifficulty, setCashierDifficulty } = useKiddieMart();
  const t = useTranslations('LoginScreen');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-blue-200 p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
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
            {t('welcome')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-6">

          <div className="bg-muted/50 p-4 rounded-xl space-y-3">
            <Label className="text-base font-semibold text-muted-foreground">{t('select_level')}</Label>
            <RadioGroup
              defaultValue={cashierDifficulty}
              onValueChange={(val) => setCashierDifficulty(val as 'preschool' | 'primary')}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="preschool" id="preschool" className="peer sr-only" />
                <Label
                  htmlFor="preschool"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                >
                  <Baby className="mb-2 h-6 w-6" />
                  {t('level_preschool')}
                </Label>
              </div>
              <div>
                <RadioGroupItem value="primary" id="primary" className="peer sr-only" />
                <Label
                  htmlFor="primary"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                >
                  <School className="mb-2 h-6 w-6" />
                  {t('level_primary')}
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            onClick={() => login('staff')}
            size="lg"
            className="w-full text-xl py-8 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform hover:scale-105 transition-transform duration-200"
          >
            <User className="mr-3 h-8 w-8" /> {t('btn_cashier')}
          </Button>
          <Button
            onClick={() => login('admin')}
            variant="secondary"
            size="lg"
            className="w-full text-xl py-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200"
          >
            <UserCog className="mr-3 h-8 w-8" /> {t('btn_admin')}
          </Button>
        </CardContent>
      </Card>
      <p className="mt-8 text-center text-foreground/70">
        {t('footer')}
      </p>
    </div>
  );
}
