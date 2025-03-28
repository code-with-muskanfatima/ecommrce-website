import { products } from '@/data/products';
import ProductGrid from '../components/ProductGrid';

export default function Home({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="hero-gradient text-white py-24 mb-16 relative">
        <div className="bg-pattern"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <header className="text-center">
            <h1 className="text-7xl font-bold mb-8 font-serif tracking-tight">
              Elite
              <span className="text-sky-200 inline-block transform hover:scale-110 transition-transform duration-300 ml-4">
                Boutique
              </span>
            </h1>
            <p className="text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12 font-light">
              Experience modern luxury redefined for the contemporary connoisseur
            </p>
            <div className="flex justify-center gap-6">
              <button className="btn-primary">
                View Collection
              </button>
              <button className="btn-secondary">
                Limited Edition
              </button>
            </div>
          </header>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <ProductGrid initialCategory={searchParams.category} products={products} />
      </div>
    </main>
  );
}
