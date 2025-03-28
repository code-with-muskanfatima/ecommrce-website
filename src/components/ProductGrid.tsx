'use client';

import { useState } from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  initialCategory?: string;
  products: Product[];
}

export default function ProductGrid({ initialCategory, products }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory || null
  );

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="flex flex-col md:flex-row gap-12">
      {/* Filters */}
      <aside className="w-full md:w-80">
        <div className="bg-zinc-800/50 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-yellow-500/10 sticky top-4 overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-zinc-100 mb-8">Collections</h2>
            <div className="space-y-4">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`category-btn ${
                  selectedCategory === null ? 'category-btn-active' : ''
                }`}
              >
                All Collections
              </button>
              <button
                onClick={() => setSelectedCategory('men')}
                className={`category-btn ${
                  selectedCategory === 'men' ? 'category-btn-active' : ''
                }`}
              >
                Men&apos;s Luxury
              </button>
              <button
                onClick={() => setSelectedCategory('women')}
                className={`category-btn ${
                  selectedCategory === 'women' ? 'category-btn-active' : ''
                }`}
              >
                Women&apos;s Elegance
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card-hover">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl text-zinc-400 font-light">
              No products found in this collection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 