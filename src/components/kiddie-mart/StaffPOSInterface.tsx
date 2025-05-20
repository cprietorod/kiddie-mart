
"use client";
import { ProductList } from './ProductList';
import { ShoppingCart } from './ShoppingCart';

export function StaffPOSInterface() {
  return (
    <div className="flex flex-col md:flex-row h-screen pt-16 bg-background overflow-hidden p-2 md:p-4 gap-2 md:gap-4">
      {/* Product List - takes more space on larger screens */}
      <div className="w-full md:w-3/5 lg:w-2/3 h-1/2 md:h-full overflow-hidden">
        <ProductList />
      </div>
      {/* Shopping Cart - takes less space */}
      <div className="w-full md:w-2/5 lg:w-1/3 h-1/2 md:h-full overflow-hidden">
        <ShoppingCart />
      </div>
    </div>
  );
}
