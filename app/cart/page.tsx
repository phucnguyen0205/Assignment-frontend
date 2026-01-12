'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/cart/cart-summary';

export default function CheckoutCartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();
  const [tempQuantities, setTempQuantities] = useState<{ [key: string]: number }>({});

  const handleInputChange = (id: number, value: string) => {
    const val = parseInt(value) || 1;
    setTempQuantities(prev => ({ ...prev, [id.toString()]: val }));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const handleProceedToCheckout = () => {
    router.push('/checkout'); 
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* BREADCRUMB SECTION */}
      <div className="bg-[#F3F6F9] py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-[#D2153D]">Home</Link>
            <span>—</span>
            <span className="text-gray-400">Cart</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900">Cart</h1>
        </div>
      </div>

      <main className="container mx-auto px-4 py-20">
        {cart.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-lg text-gray-400">
            Giỏ hàng của bạn đang trống.
          </div>
        ) : (
          <div className="space-y-10">
            {/* CART TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-gray-900 text-[16px] font-bold border-b border-gray-100">
                    <th className="py-6 px-4 text-center w-40">Images</th>
                    <th className="py-6 px-4 text-center">Courses</th>
                    <th className="py-6 px-4 text-center">Unit Price</th>
                    <th className="py-6 px-4 text-center">Quantity</th>
                    <th className="py-6 px-4 text-center">Total</th>
                    <th className="py-6 px-4 text-center">Remove</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {cart.map((item) => (
                    <tr key={item.id} className="text-gray-700">
                      <td className="py-8 px-4 border border-gray-100">
                        <div className="bg-[#F9F9F9] rounded-xl p-2 w-32 h-32 mx-auto flex items-center justify-center">
                          <div className="relative w-20 h-20">
                            <Image 
                              src={item.image || '/assets/img/product/placeholder.png'} 
                              alt={item.name} 
                              fill 
                              className="object-contain" 
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-8 px-4 border border-gray-100 text-center font-medium">{item.name}</td>
                      <td className="py-8 px-4 border border-gray-100 text-center">${item.price.toFixed(0)}</td>
                      <td className="py-8 px-4 border border-gray-100">
                        <div className="flex justify-center">
                          <input
                            type="number"
                            min="1"
                            value={tempQuantities[item.id] !== undefined ? tempQuantities[item.id] : item.quantity}
                            onChange={(e) => handleInputChange(item.id, e.target.value)}
                            className="w-24 h-12 text-center border border-gray-200 rounded-lg focus:outline-none focus:border-[#D2153D]"
                          />
                        </div>
                      </td>
                      <td className="py-8 px-4 border border-gray-100 text-center font-medium text-gray-900">
                        ${(item.price * (tempQuantities[item.id] || item.quantity)).toFixed(2)}
                      </td>
                      <td className="py-8 px-4 border border-gray-100 text-center">
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-600 transition-colors">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* COUPON & UPDATE SECTION */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex w-full md:w-auto">
                <input 
                  type="text" 
                  placeholder="Coupon code" 
                  className="border border-gray-200 px-6 py-4 w-full md:w-64 focus:outline-none rounded-l-xl"
                />
                <button className="bg-[#D2153D] hover:bg-black text-white px-8 py-4 font-bold transition-colors rounded-r-xl">
                  Apply Coupon
                </button>
              </div>
              <button 
                onClick={() => cart.forEach(item => tempQuantities[item.id] && updateQuantity(item.id, tempQuantities[item.id]))}
                className="bg-[#D2153D] hover:bg-black text-white px-10 py-4 font-bold transition-colors rounded-xl w-full md:w-auto"
              >
                Update cart
              </button>
            </div>

            {/* 4. CART TOTALS SECTION */}
            <div className="flex justify-end pt-10">
              <div className="w-full md:w-[450px]">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Cart Totals</h2>
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  <div className="flex justify-between p-5 border-b border-gray-100 bg-[#F9F9F9]">
                    <span className="text-gray-600 font-medium">Subtotal</span>
                    <span className="text-gray-500">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between p-5 bg-white">
                    <span className="text-gray-900 font-bold">Total</span>
                    <span className="text-gray-900 font-bold text-[#D2153D]">${subtotal.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={handleProceedToCheckout}
                  className="w-full bg-[#D2153D] hover:bg-black text-white py-5 mt-6 font-bold transition-all uppercase tracking-wider rounded-xl shadow-lg shadow-red-100"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}