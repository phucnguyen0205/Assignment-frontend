'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/product/product-card';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    
    return products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category?.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <section className="py-16 bg-white min-h-[60vh]">
      <div className="container mx-auto px-4 max-w-[1600px]">
        {/* Tiêu đề kết quả */}
        <div className="border-b pb-6 mb-12">
          <h2 className="flex items-baseline">
            <span className="text-[#1A1C24] text-[32px] font-bold tracking-tight">
              Tìm kiếm
            </span>
            <span className="text-[#C3293E] text-[32px] font-light ml-2">
              ...
            </span>
          </h2>
          <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest font-medium">
            {query ? (
              <>
                Kết quả tìm kiếm cho: <span className="text-black">"{query}"</span> 
                <span className="ml-2 text-gray-400">({filteredProducts.length} sản phẩm tìm thấy)</span>
              </>
            ) : (
              "Please enter a keyword to search."
            )}
          </p>
        </div>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-12">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border-2 border-dashed rounded-sm">
            <div className="max-w-md mx-auto space-y-4">
              <p className="text-gray-400 text-lg">
                {query 
                  ? "No products found matching your selection." 
                  : "Start typing to find what you're looking for."}
              </p>
              <a 
                href="/" 
                className="inline-block bg-black text-white px-8 py-3 text-[13px] font-bold uppercase tracking-widest hover:bg-[#C3293E] transition-colors"
              >
                Back to shop
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-20 text-center uppercase tracking-widest font-bold">
        Loading Search Results...
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}