
"use client";
import { useState, useCallback } from 'react';
import { useKiddieMart } from '@/context/KiddieMartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PackagePlus, Edit, Trash2, ShoppingBasket } from 'lucide-react';
import { ProductFormModal } from './ProductFormModal';
import type { Product } from '@/types/kiddieMart';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';

import { useProductLocalization } from '@/hooks/useProductLocalization';
import { useTranslations } from 'next-intl';

export function ProductManagement() {
  const { products, addProduct, updateProduct, deleteProduct } = useKiddieMart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const { getProductName, getProductCategory } = useProductLocalization();
  const t = useTranslations('Admin.Products');

  const handleOpenCreateModal = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  const handleSaveProduct = useCallback((formData: Omit<Product, 'id'> | Product) => {
    if (productToEdit && 'id' in formData) {
      updateProduct(formData.id, formData);
    } else {
      addProduct(formData as Omit<Product, 'id'>);
    }
  }, [productToEdit, addProduct, updateProduct]);

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm(t('actions.confirmDelete'))) {
      deleteProduct(productId);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 flex flex-col h-full">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-primary flex items-center">
          <ShoppingBasket className="mr-3 h-8 w-8 text-accent" /> {t('title')}
        </h1>
        <Button onClick={handleOpenCreateModal} className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg text-base py-2.5 px-6 shadow-md">
          <PackagePlus className="mr-2 h-5 w-5" /> {t('addNew')}
        </Button>
      </div>

      <Card className="shadow-xl rounded-2xl overflow-hidden flex flex-col flex-1">
        <CardHeader className="bg-card-foreground/5 p-4">
          <CardTitle className="text-xl text-primary">{t('listTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <Table>
              <TableHeader className="bg-muted/50 sticky top-0 z-10">
                <TableRow>
                  <TableHead className="w-[60px] text-center">{t('headers.icon')}</TableHead>
                  <TableHead>{t('headers.name')}</TableHead>
                  <TableHead>{t('headers.category')}</TableHead>
                  <TableHead className="w-[100px] text-right">{t('headers.price')}</TableHead>
                  <TableHead className="w-[100px] text-center">{t('headers.stock')}</TableHead>
                  <TableHead className="text-right w-[180px]">{t('headers.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length > 0 ? (
                  products.map(product => (
                    <TableRow key={product.id} className="hover:bg-accent/10">
                      <TableCell className="text-center">
                        {(product.image && (product.image.startsWith('http://') || product.image.startsWith('https://'))) ? (
                          <Image src={product.image} alt={getProductName(product)} width={40} height={40} className="rounded object-cover aspect-square mx-auto" data-ai-hint={product.dataAiHint} />
                        ) : (
                          <span className="text-3xl" role="img" aria-label={getProductCategory(product)}>{product.emoji}</span>
                        )}
                      </TableCell>
                      <TableCell className="font-medium text-foreground">{getProductName(product)}</TableCell>
                      <TableCell className="text-muted-foreground">{getProductCategory(product)}</TableCell>
                      <TableCell className="text-right font-semibold text-primary-foreground">${product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-center">{product.stock}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleOpenEditModal(product)} className="rounded-md border-primary text-primary hover:bg-primary/10">
                          <Edit className="mr-1 h-4 w-4" /> {t('actions.edit')}
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)} className="rounded-md">
                          <Trash2 className="mr-1 h-4 w-4" /> {t('actions.delete')}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-32 text-muted-foreground text-lg">
                      {t('empty')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        productToEdit={productToEdit}
        onSave={handleSaveProduct}
      />
    </div>
  );
}
