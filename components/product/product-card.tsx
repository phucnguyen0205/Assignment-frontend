'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingCart, Eye, GitCompare } from 'lucide-react';
import { Product } from '@/types';
import { useAuth } from '@/app/providers';

interface ProductCardProps {
  product: Product;
  onWishlistClick?: () => void;
  isWishlisted?: boolean;
  onAddToCartClick?: () => void;
}

export default function ProductCard({ 
  product, 
  onWishlistClick, 
  isWishlisted = false,
  onAddToCartClick
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleProtectedAction = (e: React.MouseEvent, action?: () => void) => {
  e.preventDefault();
  e.stopPropagation();

  const token = typeof window !== 'undefined' ? localStorage.getItem("accessToken") : null;

  if (!user && !token) {
    alert("Vui lòng đăng nhập để thực hiện!");
    router.push('/auth');
    return;
  }

  action?.();
};

  return (
    <div 
      className="group relative flex w-full flex-col bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-sm">
        <Link href="/shop-details" className="relative block h-full w-full">
          <Image
            src={isHovered && product.hoverImage ? product.hoverImage : product.image}
            alt={product.name}
            fill
            className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        
        <div className={`absolute inset-0 z-10 flex items-center justify-center transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="flex gap-4 rounded-lg bg-white p-3 shadow-xl border border-gray-100">
            <button 
              onClick={(e) => handleProtectedAction(e, onAddToCartClick)}
              className="text-gray-400 hover:text-[#C3293E] transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>

            <button className="text-gray-400 hover:text-[#C3293E] transition-colors">
              <GitCompare className="h-5 w-5" />
            </button>
            <button 
              onClick={(e) => handleProtectedAction(e, onWishlistClick)}
              className={`transition-all active:scale-125 ${isWishlisted ? 'text-[#C3293E]' : 'text-gray-400 hover:text-[#C3293E]'}`}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>

        <div className="absolute left-3 top-3 z-20 flex flex-col gap-2">
          {product.isNew && (
            <span className="rounded-sm bg-blue-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">New</span>
          )}
          {product.isSale && (
            <span className="rounded-sm bg-[#C3293E] px-2 py-0.5 text-[10px] font-bold uppercase text-white">Sale</span>
          )}
        </div>
      </div>

      <div className="flex flex-col space-y-1 py-4 text-left">
        <Link href="/shop-details">
          <h3 className="line-clamp-1 text-sm font-medium text-gray-600 hover:text-[#C3293E] transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-black">${product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
}