'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ChevronDown, 
  ShoppingCart, 
  User, 
  Heart, 
  Search 
} from 'lucide-react';
import { useCart } from '@/components/cart/cart-summary';
import CartSidebar from '@/components/cart/mini-cart';
import { useWishlist } from '@/components/home/wishlist-context';

export default function MainHeader() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { getTotalItems } = useCart();
  const { wishlistItems } = useWishlist();
  const wishlistCount = wishlistItems?.length || 0;

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const menuItems = [
    { label: 'Home', dropdown: [{ label: 'Wooden Home', href: '/' }, { label: 'Fashion Home', href: '/index-2' }] },
    { label: 'Shop', dropdown: [{ label: 'Shop List', href: '/shop' }, { label: 'Cart Page', href: '/cart' }] },
    { label: 'Pages', dropdown: [{ label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }] },
    { label: 'Blog', dropdown: [{ label: 'Blog Standard', href: '/blog' }] },
  ];

  return (
    <>
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between h-20">
          
          <div className="flex-shrink-0">
            <Link href="/">
              <Image 
                src="/assets/img/logo/logo.png" 
                alt="VTC Academy" 
                width={180} 
                height={60} 
                className="object-contain" 
                priority 
              />
            </Link>
          </div>

          <nav className="hidden lg:block ml-10">
            <ul className="flex items-center gap-10">
              {menuItems.map((item) => (
                <li 
                  key={item.label} 
                  className="relative flex items-center h-20" 
                  onMouseEnter={() => setOpenDropdown(item.label)} 
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className={`flex items-center gap-1 text-[15px] font-bold transition-colors ${openDropdown === item.label ? 'text-[#C12744]' : 'text-black'}`}>
                    {item.label} 
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {openDropdown === item.label && (
                    <div className="absolute top-[80%] left-0 w-52 bg-white border border-gray-100 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                      {item.dropdown.map((subItem) => (
                        <Link 
                          key={subItem.label} 
                          href={subItem.href} 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#C12744] transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
              <li><Link href="/contact" className="text-[15px] font-bold text-black hover:text-[#C12744]">Contact</Link></li>
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:text-[#C12744] transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute top-0 right-0 bg-[#C12744] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white">
                  {getTotalItems()}
                </span>
              )}
            </button>

            <Link href="/auth" className="p-2 hover:text-[#C12744] transition-colors"><User className="w-6 h-6" /></Link>
            
            <Link href="/wishlist" className="relative p-2 hover:text-[#C12744] transition-colors">
              <Heart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#C12744] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <div className="relative hidden md:block ml-2">
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="pl-4 pr-10 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-lg w-60 text-sm focus:outline-none focus:ring-1 focus:ring-[#C12744]" 
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}