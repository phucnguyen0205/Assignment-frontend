'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '@/components/home/wishlist-context';

export default function WishlistPage() {
const { wishlistItems: wishlist, toggleWishlist } = useWishlist();

  const [tempQuantities, setTempQuantities] = useState<{ [key: string]: number }>({});

  const handleInputChange = (id: number, value: string) => {
    const val = parseInt(value) || 1;
    setTempQuantities(prev => ({ ...prev, [id.toString()]: val }));
  };

  const handleAddToCartFromWishlist = (item: any) => {
    const qty = tempQuantities[item.id] || 1;
    addToCart({ ...item, quantity: qty });
    alert(`Added ${item.name} to cart!`);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="relative h-[250px] w-full flex items-center overflow-hidden">
        <Image 
          src="/assets/img/banner/breadcrumb-01.jpg" 
          alt="Banner" 
          fill 
          className="object-cover" 
          priority 
        />
        {/* Lớp phủ nhẹ để chữ nổi bật hơn */}
        <div className="absolute inset-0 bg-black/5"></div>
        
        <div className="container mx-auto px-4 z-10 relative">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Link href="/" className="hover:text-[#D2153D] transition-colors">Home</Link>
            <span className="text-gray-400">—</span>
            <span className="text-gray-500">Wishlist</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Wishlist</h1>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16">
        {wishlist.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-2xl text-gray-400">
            Your wishlist is currently empty.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-100">
              <thead>
                <tr className="bg-white text-gray-900 text-[15px] font-bold">
                  <th className="py-5 px-4 border border-gray-100 text-center w-32 md:w-40">Images</th>
                  <th className="py-5 px-4 border border-gray-100 text-center">Courses</th>
                  <th className="py-5 px-4 border border-gray-100 text-center">Unit Price</th>
                  <th className="py-5 px-4 border border-gray-100 text-center">Quantity</th>
                  <th className="py-5 px-4 border border-gray-100 text-center">Total</th>
                  <th className="py-5 px-4 border border-gray-100 text-center">Add To Cart</th>
                  <th className="py-5 px-4 border border-gray-100 text-center">Remove</th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((item) => {
                  const currentQty = tempQuantities[item.id] || 1;
                  return (
                    <tr key={item.id} className="text-[15px] text-gray-700 hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 border border-gray-100">
                        <div className="relative w-24 h-24 mx-auto bg-[#F9F9F9] rounded-xl flex items-center justify-center overflow-hidden">
                          <Image 
                            src={item.image || '/assets/img/product/placeholder.png'} 
                            alt={item.name} 
                            fill 
                            className="object-contain p-2" 
                          />
                        </div>
                      </td>

                      <td className="p-4 border border-gray-100 text-center font-medium text-gray-900">
                        {item.name}
                      </td>

                      <td className="p-4 border border-gray-100 text-center">
                        ${item.price.toFixed(0)}
                      </td>

                      <td className="p-4 border border-gray-100">
                        <div className="flex justify-center">
                          <input
                            type="number"
                            min="1"
                            value={currentQty}
                            onChange={(e) => handleInputChange(item.id, e.target.value)}
                            className="w-24 h-14 text-center border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C63548]"
                          />
                        </div>
                      </td>

                      <td className="p-4 border border-gray-100 text-center font-semibold">
                        ${(item.price * currentQty).toFixed(2)}
                      </td>

                      <td className="p-4 border border-gray-100 text-center">
                        <button 
                          onClick={() => handleAddToCartFromWishlist(item)}
                          className="bg-[#C63548] hover:bg-black text-white px-6 py-3.5 rounded-xl text-[13px] font-bold transition-all uppercase whitespace-nowrap shadow-sm shadow-red-100"
                        >
                          Add To Cart
                        </button>
                      </td>

                      <td className="p-4 border border-gray-100 text-center">
                        <button 
                          onClick={() => toggleWishlist(item)}

                          className="text-gray-400 hover:text-red-600 transition-colors font-medium"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

function addToCart(arg0: any) {
    throw new Error('Function not implemented.');
}
