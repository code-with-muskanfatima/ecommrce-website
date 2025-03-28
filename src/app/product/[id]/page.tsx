'use client';

import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState } from 'react';

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Image */}
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-2xl font-semibold text-blue-600">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <p className="text-gray-600">{product.description}</p>

              {/* Size Selection */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Size</h3>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`border rounded-md py-2 text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? 'border-blue-600 text-blue-600 bg-blue-50'
                          : 'hover:border-blue-600 hover:text-blue-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Color</h3>
                <div className="grid grid-cols-4 gap-2">
                  {product.color.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`border rounded-md py-2 text-sm font-medium transition-colors ${
                        selectedColor === color
                          ? 'border-blue-600 text-blue-600 bg-blue-50'
                          : 'hover:border-blue-600 hover:text-blue-600'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-3 px-8 rounded-md font-semibold hover:bg-blue-700 transition-colors"
              >
                Add to Cart
              </button>

              {/* Back to Shopping */}
              <Link
                href="/"
                className="inline-block text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 