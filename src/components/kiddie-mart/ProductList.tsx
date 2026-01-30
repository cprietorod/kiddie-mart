
"use client";
import { useMemo, useState } from 'react';
import { useKiddieMart } from '@/context/KiddieMartContext';
import { ProductItem } from './ProductItem';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Filter } from 'lucide-react';
import { MathChallengeModal } from './MathChallengeModal';
import type { Product } from '@/types/kiddieMart';

import { useProductLocalization } from '@/hooks/useProductLocalization';

export function ProductList() {
  const { products, cashierDifficulty, addToCart, cartTotal } = useKiddieMart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { getProductName, getProductCategory } = useProductLocalization();

  // Math Challenge State
  const [mathModalOpen, setMathModalOpen] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);
  const [mathProblem, setMathProblem] = useState({ problem: '', answer: 0 });

  const categories = useMemo(() => ['All', ...new Set(products.map(p => getProductCategory(p)))], [products, getProductCategory]);

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      (getProductName(product).toLowerCase().includes(searchTerm.toLowerCase()) ||
        getProductCategory(product).toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'All' || getProductCategory(product) === selectedCategory)
    );
  }, [products, searchTerm, selectedCategory, getProductName, getProductCategory]);

  const handleProductClick = (product: Product) => {
    if (cashierDifficulty === 'primary') {
      const currentTotal = cartTotal;
      const price = product.price;
      const newTotal = currentTotal + price;

      // Generate a problem: "Total actual ($X) + Precio ($Y) = ?"
      // Or simpler: "$X + $Y = ?"
      setMathProblem({
        problem: `$${currentTotal.toFixed(2)} + $${price.toFixed(2)} = ?`,
        answer: newTotal
      });
      setPendingProduct(product);
      setMathModalOpen(true);
    } else {
      addToCart(product);
    }
  };

  const handleMathSuccess = () => {
    if (pendingProduct) {
      addToCart(pendingProduct);
      setPendingProduct(null);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background rounded-l-2xl shadow-inner relative">
      <div className="p-4 border-b border-border sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Busca productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-full text-base h-12 shadow-sm focus-visible:ring-accent"
            name="productSearch"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px] rounded-full h-10 shadow-sm focus:ring-accent" aria-label="Filtrar por categoría">
              <SelectValue placeholder="Todas las Categorías" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {categories.map(category => (
                <SelectItem key={category} value={category} className="text-base focus:bg-accent/20">
                  {category === 'All' ? 'Todas las Categorías' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <ScrollArea className="flex-grow">
        <div className="p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} onClick={() => handleProductClick(product)} className="cursor-pointer">
                {/* We wrap ProductItem to hijack the click. ProductItem might have its own button, 
                     but usually the whole card is clickable or the button inside calls addToCart directly. 
                     We need to check ProductItem implementation. 
                     If ProductItem takes an onAdd prop, that's better. 
                     Let's assume for now we can wrap it or pass a prop if I edit ProductItem too.
                     Actually, looking at ProductItem usage before, it didn't take props. 
                     Wait, ProductItem likely calls useKiddieMart internally? 
                     Let's check ProductItem.tsx content first to be sure. 
                     I will assume I need to modify ProductItem to accept an onClick override or similar.
                     For now, I'll wrap it in a div that captures clicks if possible, 
                     OR better, I'll modify ProductItem to accept an `onAddToCart` prop.
                  */}
                <ProductItem product={product} onAddToCart={() => handleProductClick(product)} />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground text-lg py-10">
              ¡Oh no! Ningún producto coincide con tu búsqueda. 🛒
            </p>
          )}
        </div>
      </ScrollArea>

      <MathChallengeModal
        isOpen={mathModalOpen}
        onClose={() => setMathModalOpen(false)}
        onSuccess={handleMathSuccess}
        problem={mathProblem.problem}
        correctAnswer={mathProblem.answer}
      />
    </div>
  );
}
