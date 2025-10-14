'use client';
import useCartService from '@/lib/hook/useCartStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ShoppingCart, User } from 'lucide-react'; // optional icons if you have lucide-react installed

export default function Menu() {
  const { items } = useCartService();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted ? items.reduce((a, i) => a + i.qty, 0) : 0;

  return (
    <nav className="flex items-center justify-end space-x-6 text-gray-700 font-medium">
      {/* Cart */}
      <Link
        href="/cart"
        className="relative flex items-center gap-2 hover:text-blue-600 transition-colors duration-300"
      >
        <ShoppingCart className="w-5 h-5" />
        <span>Cart</span>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
            {totalItems}
          </span>
        )}
      </Link>

      {/* Sign In */}
      <Link
        href="/signin"
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
      >
        <User className="w-5 h-5" />
        <span>Sign In</span>
      </Link>
    </nav>
  );
}
