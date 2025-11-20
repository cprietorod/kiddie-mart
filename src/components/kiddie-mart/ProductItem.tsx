
"use client";
import type { Product } from '@/types/kiddieMart';
import { useKiddieMart } from '@/context/KiddieMartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ProductItemProps {
  product: Product;
  onAddToCart?: () => void;
}

export function ProductItem({ product, onAddToCart }: ProductItemProps) {
  const { addToCart } = useKiddieMart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart();
    } else {
      addToCart(product);
    }
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 500); // Duration of animation
  };

  return (
    <Card className={`flex flex-col justify-between overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${isAdding ? 'animate-item-added' : ''}`}>
      <CardHeader className="p-3 md:p-4 text-center">
        {(product.image && (product.image.startsWith('http://') || product.image.startsWith('https://'))) ? (
          <Image
            src={product.image}
            alt={product.name}
            width={150}
            height={150}
            className="mx-auto mb-3 rounded-lg object-cover aspect-square"
            data-ai-hint={product.dataAiHint}
          />
        ) : (
          <div className="text-6xl md:text-7xl mb-3" role="img" aria-label={product.category}>{product.emoji}</div>
        )}
        <CardTitle className="text-base md:text-lg font-semibold leading-tight">{product.name}</CardTitle>
        <CardDescription className="text-xs md:text-sm">{product.category}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0 pb-2 md:pb-3 text-center">
        <p className="text-xl md:text-2xl font-bold text-primary-foreground">${product.price.toFixed(2)}</p>
        <p className={`text-xs md:text-sm ${product.stock > 0 ? 'text-green-500' : 'text-destructive'}`}>
          {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
        </p>
      </CardContent>
      <CardFooter className="p-2 md:p-3">
        <Button
          onClick={handleAddToCart}
          className="w-full rounded-lg text-sm md:text-base px-3 py-2.5 bg-accent text-accent-foreground hover:bg-accent/90 focus:ring-accent items-baseline whitespace-normal h-auto"
          disabled={product.stock <= 0 || isAdding}
          aria-label={`Añadir ${product.name} a la bolsa`}
        >
          <ShoppingBag className="h-4 w-4" />
          Añadir a la Bolsa
        </Button>
      </CardFooter>
    </Card>
  );
}
