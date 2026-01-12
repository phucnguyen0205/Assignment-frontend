'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Heart, 
  ChevronDown, 
  LogIn, 
  UserPlus, 
  LogOut, 
  LayoutDashboard 
} from 'lucide-react';
import { useCart } from '@/components/cart/cart-summary';
import CartSidebar from '@/components/cart/mini-cart';
import { useAuth } from '@/app/providers'; 
import { useWishlist } from '@/components/home/wishlist-context';


export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();
  
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;
  const { getTotalItems } = useCart();
  
  const { wishlistItems } = useWishlist(); 
  const wishlistCount = wishlistItems?.length || 0;

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className="bg-white border-b relative z-[60]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4 gap-6">
            
            <Link href="/" className="flex-shrink-0">
              <Image 
                src="/assets/img/logo/logo.png" 
                alt="VTC Academy" 
                width={180} 
                height={60}
                className="object-contain"
              />
            </Link>

            <div className="hidden md:flex flex-1 max-w-2xl">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-gray-200 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative hover:text-[#C3293E] transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#C3293E] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              <div className="relative group">
                <Link href={isLoggedIn ? "#" : "/auth"}>
                  <button className="flex items-center gap-1 hover:text-[#C3293E] transition-colors py-2">
                    <User className={`w-6 h-6 ${isLoggedIn ? 'text-[#C3293E]' : ''}`} />
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform" />
                  </button>
                </Link>

                <div className="absolute right-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[70]">
                  <div className="bg-white border border-gray-100 shadow-2xl rounded-lg py-2 overflow-hidden">
                    {!isLoggedIn ? (
                      <>
                        <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                          Tài khoản
                        </div>
                        <Link 
                          href="/auth" 
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-[#C3293E]/5 hover:text-[#C3293E] transition-colors"
                        >
                          <LogIn className="w-4 h-4" />
                          Đăng nhập
                        </Link>
                        <Link 
                          href="/auth" 
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-[#C3293E]/5 hover:text-[#C3293E] transition-colors"
                        >
                          <UserPlus className="w-4 h-4" />
                          Tạo tài khoản
                        </Link>
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                          Xin chào!
                        </div>
                        <Link 
                          href="/dashboard" 
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-[#C3293E]/5 hover:text-[#C3293E] transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Bảng điều khiển
                        </Link>
                        <Link 
                          href="/profile" 
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-[#C3293E]/5 hover:text-[#C3293E] transition-colors"
                        >
                          <User className="w-4 h-4" />
                          Hồ sơ cá nhân
                        </Link>
                        <hr className="my-1 border-gray-100" />
                        <button 
                          onClick={() => logout?.()} 
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Đăng xuất
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <Link href="/wishlist" className="relative hover:text-[#C3293E] transition-colors">
                <Heart className="w-6 h-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#C3293E] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}