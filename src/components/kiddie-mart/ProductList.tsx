
"use client";
import { useMemo, useState } from 'react';
import { useKiddieMart } from '@/context/KiddieMartContext';
import { ProductItem } from './ProductItem';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Filter } from 'lucide-react';

export function ProductList() {
  const { products } = useKiddieMart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(products.map(p => p.category))], [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       product.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'All' || product.category === selectedCategory)
    );
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="h-full flex flex-col bg-background rounded-l-2xl shadow-inner">
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
            filteredProducts.map(product => <ProductItem key={product.id} product={product} />)
          ) : (
            <p className="col-span-full text-center text-muted-foreground text-lg py-10">
              ¡Oh no! Ningún producto coincide con tu búsqueda. 🛒
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
