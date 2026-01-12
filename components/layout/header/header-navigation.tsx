'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  ChevronDown,
  Phone,
  MapPin,
  Flame,
  Gift,
  Droplet,
  Crown,
  Gem,
} from "lucide-react";

export default function HeaderNavigation() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const categories = [
    { name: "Candles", icon: Flame, color: "text-red-500" },
    { name: "Handmade", icon: Gift, color: "text-red-500" },
    { name: "Gift Sets", icon: Gift, color: "text-red-500" },
    { name: "Plastic Gifts", icon: Gem, color: "text-red-500" },
    { name: "Handy Cream", icon: Droplet, color: "text-red-500" },
    { name: "Cosmetics", icon: Crown, color: "text-red-500" },
    { name: "Silk Accessories", icon: Gem, color: "text-red-500" },
  ];

  const menuItems = [
    { label: "Home", dropdown: [{ label: "Wooden Home", href: "/" }, { label: "Fashion Home", href: "/index-2" }] },
    { label: "Shop", dropdown: [{ label: "Shop", href: "/shop" }, { label: "Cart", href: "/cart" }] },
    { label: "Pages", dropdown: [{ label: "About", href: "/about" }, { label: "Contact", href: "/contact" }] },
    { label: "Blog", dropdown: [{ label: "Blog", href: "/blog" }, { label: "Blog Details", href: "/blog-details" }] },
    { label: "Contact", dropdown: [], href: "/contact" },
  ];

  return (
    <nav className="bg-white border-b relative z-50">
      <div className="container mx-auto px-4 flex items-center h-16">

        <div className="relative group shrink-0">
          <button className="bg-[#BC3444] text-white flex items-center gap-3 px-6 h-[60px] rounded-t-lg font-bold min-w-[260px] text-lg">
            <Menu className="w-5 h-5" />
            <span className="tracking-wide">Categories</span>
            <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${!isHomePage ? 'group-hover:rotate-180' : ''}`} />
          </button>

          <div className={`absolute top-full left-0 w-[260px] bg-white border border-t-0 shadow-xl py-1 z-[60] rounded-b-lg
            ${isHomePage ? 'block' : 'hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-200'}`}
          >
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={`/shop?category=${cat.name.toLowerCase()}`}
                className="flex items-center gap-4 px-8 py-[13px] hover:bg-gray-50 transition-colors group/item"
              >
                <cat.icon className={`w-5 h-5 ${cat.color} opacity-80`} />
                <span className="text-[15px] font-bold text-[#111] group-hover/item:text-[#BC3444]">{cat.name}</span>
              </Link>
            ))}

            <div className="border-t border-gray-100 mt-1 pt-1 bg-gray-50/50">
              <Link href="/shop" className="block px-8 py-[11px] text-[15px] font-bold text-[#111] hover:text-[#BC3444]">Value of the Day</Link>
              <Link href="/shop" className="block px-8 py-[11px] text-[15px] font-bold text-[#111] hover:text-[#BC3444]">Top 100 Offers</Link>
              <Link href="/shop" className="block px-8 py-[11px] text-[15px] font-bold text-[#111] hover:text-[#BC3444]">New Arrivals</Link>
            </div>
          </div>
        </div>

        <ul className="flex items-center gap-8 ml-10">
          {menuItems.map((item) => (
            <li key={item.label} className="relative group h-16 flex items-center">
              {item.dropdown.length > 0 ? (
                <button className="flex items-center gap-1 font-bold text-gray-900 hover:text-[#BC3444] transition-colors">
                  {item.label}
                  <ChevronDown className="w-3 h-3 text-gray-400 group-hover:rotate-180 transition-transform" />
                </button>
              ) : (
                <Link href={item.href || "#"} className="font-bold text-gray-900 hover:text-[#BC3444] transition-colors">
                  {item.label}
                </Link>
              )}

              {item.dropdown.length > 0 && (
                <div className="absolute top-full left-0 hidden group-hover:block w-48 bg-white border shadow-xl py-2 z-50">
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#BC3444]"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-8 ml-auto">
          <a href="tel:1900292958" className="hidden lg:flex items-center gap-2 font-bold text-gray-900 hover:text-[#BC3444]">
            <Phone className="w-4 h-4 text-[#BC3444]" />
            <span>1900 292958</span>
          </a>
          <Link href="/shop-location" className="hidden sm:flex items-center gap-2 font-bold text-gray-900 hover:text-[#BC3444]">
            <MapPin className="w-4 h-4 text-[#BC3444]" />
            <span>Find Store</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}