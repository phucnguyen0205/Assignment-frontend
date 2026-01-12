'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function SideBanners() {
  return (
    <div className="w-full h-full flex flex-col gap-4"> 

      <Link href="/shop-details" className="relative flex-1 block bg-pink-50 rounded-lg overflow-hidden group">
        <div className="absolute inset-0 z-10 p-6 flex flex-col justify-center">
          <span className="text-pink-600 text-sm font-medium mb-1">Hand made</span>
          <h3 className="text-xl font-bold text-gray-900 leading-tight">
            New Modern Stylist Crafts
          </h3>
        </div>
        <Image
          src="/assets/img/slider/banner-slider-01.jpg"
          alt="Hand made crafts"
          fill
          className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <Link href="/shop-details" className="relative flex-1 block bg-gray-50 rounded-lg overflow-hidden group">
        <div className="absolute inset-0 z-10 p-6 flex flex-col justify-center">
          <span className="text-pink-600 text-sm font-medium mb-1">Popular</span>
          <h3 className="text-xl font-bold text-gray-900 leading-tight">
            Energy with our newest collection
          </h3>
        </div>
        <Image
          src="/assets/img/slider/banner-slider-02.jpg"
          alt="Popular collection"
          fill
          className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
    </div>
  );
}