
"use client";
import type { Product } from '@/types/kiddieMart';
import { useEffect, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
  onSave: (formData: Omit<Product, 'id'> | Product) => void;
}

export function ProductFormModal({ isOpen, onClose, productToEdit, onSave }: ProductFormModalProps) {
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const t = useTranslations('Admin.ProductForm');

  useEffect(() => {
    if (isOpen) {
      setFormData(productToEdit || { name: '', name_en: '', price: 0, category: '', category_en: '', stock: 0, emoji: '', image: '', dataAiHint: '' });
      setErrors({});
    }
  }, [isOpen, productToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) { setErrors(prev => ({ ...prev, [name]: '' })); }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) newErrors.name = t('errors.name');
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = t('errors.price');
    }
    if (!formData.category?.trim()) newErrors.category = t('errors.category');
    const stockValue = parseInt(String(formData.stock), 10);
    if (isNaN(stockValue) || stockValue < 0) {
      newErrors.stock = t('errors.stock');
    }
    if (!formData.emoji?.trim()) newErrors.emoji = t('errors.emoji');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const priceNum = parseFloat(String(formData.price));
      const stockNum = parseInt(String(formData.stock), 10);

      const commonData = {
        name: formData.name || '',
        name_en: formData.name_en?.trim() || undefined,
        category: formData.category || '',
        category_en: formData.category_en?.trim() || undefined,
        price: isNaN(priceNum) ? 0 : priceNum,
        stock: isNaN(stockNum) ? 0 : stockNum,
        emoji: formData.emoji || '',
        image: formData.image?.trim() || undefined,
        dataAiHint: formData.dataAiHint?.trim() || undefined,
      };

      if (productToEdit && formData.id) {
        const dataToSave: Product = {
          ...commonData,
          id: formData.id,
        };
        onSave(dataToSave);
      } else {
        const dataToSave: Omit<Product, 'id'> = commonData;
        onSave(dataToSave);
      }
      onClose();
    }
  };

  const handleModalOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalOpenChange}>
      <DialogContent className="sm:max-w-lg bg-background rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-bold text-primary">
            {productToEdit ? t('editTitle') : t('addTitle')}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name" className="text-foreground/80">{t('labels.name')}</Label>
            <Input name="name" value={formData.name || ''} onChange={handleChange} placeholder={t('placeholders.name')} aria-required="true" className="rounded-lg h-11 focus:ring-accent" />
            {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="name_en" className="text-foreground/80">{t('labels.nameEn')}</Label>
            <Input name="name_en" value={formData.name_en || ''} onChange={handleChange} placeholder={t('placeholders.nameEn')} className="rounded-lg h-11 focus:ring-accent" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="price" className="text-foreground/80">{t('labels.price')}</Label>
              <Input name="price" type="number" value={formData.price || ''} onChange={handleChange} placeholder={t('placeholders.price')} step="0.01" min="0.01" aria-required="true" className="rounded-lg h-11 focus:ring-accent" />
              {errors.price && <p className="text-destructive text-xs mt-1">{errors.price}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="stock" className="text-foreground/80">{t('labels.stock')}</Label>
              <Input name="stock" type="number" value={formData.stock || ''} onChange={handleChange} placeholder={t('placeholders.stock')} min="0" step="1" aria-required="true" className="rounded-lg h-11 focus:ring-accent" />
              {errors.stock && <p className="text-destructive text-xs mt-1">{errors.stock}</p>}
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="category" className="text-foreground/80">{t('labels.category')}</Label>
            <Input name="category" value={formData.category || ''} onChange={handleChange} placeholder={t('placeholders.category')} aria-required="true" className="rounded-lg h-11 focus:ring-accent" />
            {errors.category && <p className="text-destructive text-xs mt-1">{errors.category}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="category_en" className="text-foreground/80">{t('labels.categoryEn')}</Label>
            <Input name="category_en" value={formData.category_en || ''} onChange={handleChange} placeholder={t('placeholders.categoryEn')} className="rounded-lg h-11 focus:ring-accent" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="emoji" className="text-foreground/80">{t('labels.emoji')}</Label>
              <Input name="emoji" value={formData.emoji || ''} onChange={handleChange} placeholder={t('placeholders.emoji')} maxLength={4} aria-required="true" className="rounded-lg h-11 focus:ring-accent" />
              {errors.emoji && <p className="text-destructive text-xs mt-1">{errors.emoji}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="dataAiHint" className="text-foreground/80">{t('labels.aiHint')}</Label>
              <Input name="dataAiHint" value={formData.dataAiHint || ''} onChange={handleChange} placeholder={t('placeholders.aiHint')} className="rounded-lg h-11 focus:ring-accent" />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="image" className="text-foreground/80">{t('labels.image')}</Label>
            <Input name="image" value={formData.image || ''} onChange={handleChange} placeholder={t('placeholders.image')} className="rounded-lg h-11 focus:ring-accent" />
            {errors.image && <p className="text-destructive text-xs mt-1">{errors.image}</p>}
          </div>
          <DialogFooter className="pt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="rounded-lg text-base py-2.5">{t('cancel')}</Button>
            </DialogClose>
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg text-base py-2.5">{productToEdit ? t('save') : t('add')}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
