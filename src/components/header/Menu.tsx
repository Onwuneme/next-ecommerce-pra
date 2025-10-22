'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import useCartService from '@/lib/hook/useCartStore';
export default function Menu() {
  const { items } = useCartService();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const totalItems = mounted ? items.reduce((a, i) => a + i.qty, 0) : 0;

  const signOutHandler = () => {
    setDropdownOpen(false);
    signOut({ callbackUrl: '/signin' });
  };

  return (
    <nav className="flex items-center justify-end space-x-6 text-gray-800 font-medium">
      {/* 🛒 Cart */}
      <Link
        href="/cart"
        className="relative flex items-center gap-2 hover:text-blue-600 transition-colors duration-300"
      >
        <ShoppingCart className="w-5 h-5" />
        <span>Cart</span>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
            {totalItems}
          </span>
        )}
      </Link>

      {/* 👤 User Section */}
      {session?.user ? (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-300"
          >
            <User className="w-5 h-5" />
            <span>{session.user.name}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-4 h-4 transform transition-transform ${
                dropdownOpen ? 'rotate-180' : 'rotate-0'
              }`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden animate-fadeIn">
              <li>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={signOutHandler}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </li>
            </ul>
          )}
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-sm"
        >
          <User className="w-5 h-5" />
          <span>Sign In</span>
        </button>
      )}
    </nav>
  );
}
