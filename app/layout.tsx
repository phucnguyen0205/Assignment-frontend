'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "@/app/providers"; 
import { CartProvider } from "@/components/cart/cart-summary";
import { WishlistProvider } from "@/components/home/wishlist-context";
import TopBar from "@/components/layout/header/top-bar";
import Header from "@/components/layout/header/header";
import HeaderNavigation from "@/components/layout/header/header-navigation";
import StickyHeader from "@/components/layout/header/sticky-header";
import Footer from "@/components/layout/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth antialiased">
      <body className={`${inter.className} min-h-screen bg-white text-gray-900 selection:bg-red-100 selection:text-red-900`}>
        <AuthProvider> 
          <CartProvider>
    <WishlistProvider>
              <div className="flex min-h-screen flex-col overflow-x-hidden">
                
                <header className="relative z-50 flex w-full flex-col bg-white shadow-sm">
                  <div className="hidden border-b border-gray-100 md:block">
                    <TopBar />
                  </div>
                  <div className="w-full">
                    <Header />
                  </div>
                  <div className="hidden w-full border-y border-gray-50 lg:block">
                    <HeaderNavigation />
                  </div>
                  <StickyHeader />
                </header>
                <main className="relative flex-1 bg-gray-50/50">
                  <div className="container mx-auto min-h-screen px-0 transition-all duration-300 sm:px-4 md:px-6 lg:px-8">
                    {children}
                  </div>
                </main>
                <footer className="w-full border-t border-gray-100 bg-white pt-12 pb-8">
                  <div className="container mx-auto">
                    <Footer />
                  </div>
                </footer>

              </div>
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 3500,
                  className: 'rounded-2xl bg-white p-4 text-sm font-medium text-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 flex gap-3 min-w-[300px]',
                  success: {
                    iconTheme: {
                      primary: '#C3293E',
                      secondary: '#fff',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#1A1C24',
                      secondary: '#fff',
                    },
                  },
                }}
              /> 

           </WishlistProvider>
  </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}