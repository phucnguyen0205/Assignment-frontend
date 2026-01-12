'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/providers';
import CheckoutForm from './checkout-form';

export default function CheckoutPage() {
  const { user } = useAuth();

const isLoggedIn = !!user;

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null; // Tránh hiện giao diện checkout khi đang redirect

  return <CheckoutForm />;
}