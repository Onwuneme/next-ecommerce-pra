'use client';

import useCartService from '@/lib/hook/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CartDetails() {
  const router = useRouter();
  const { items, itemsPrice, decrease, increase } = useCartService();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div></div>;

  return (
    <div className="max-w-6xl mx-auto p-5">
      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-gray-700">🛒 Your cart is empty.</p>
          <Link
            href="/"
            className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-300"
          >
            Go shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 gap-6 mt-5">
          {/* Cart Items */}
          <div className="md:col-span-3 overflow-x-auto bg-white rounded-xl shadow p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left text-gray-600 uppercase text-sm">
                  <th className="py-2">Item</th>
                  <th className="py-2">Quantity</th>
                  <th className="py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {items?.map((item) => (
                  <tr
                    key={item.slug}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 flex items-center space-x-3">
                      <Link href={`/product/${item.slug}`}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-md object-cover"
                        />
                      </Link>
                      <span className="font-medium text-gray-800">
                        {item.name}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => decrease(item)}
                          className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center font-bold text-lg"
                        >
                          -
                        </button>
                        <span className="font-semibold text-gray-800">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => increase(item)}
                          className="w-8 h-8 bg-blue-600 text-white hover:bg-blue-700 rounded-lg flex items-center justify-center font-bold text-lg"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-3 font-semibold text-gray-700">
                      ${item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white p-6 h-fit rounded-lg shadow-md border mt-6 md:mt-0">
            <ul className="space-y-4">
              <li className="flex justify-between items-center text-lg font-medium">
                <span>
                  Subtotal ({items.reduce((acc, item) => acc + item.qty, 0)}{' '}
                  items)
                </span>
                <span className="text-blue-600 font-semibold">
                  ${itemsPrice}
                </span>
              </li>
              <li>
                <button
                  onClick={() => router.push('/shipping')}
                  className="w-full bg-blue-600 text-white font-semibold py-3  rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400"
                  disabled={items.length === 0}
                >
                  Proceed to Checkout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// {/* Summary */}
// <div className="bg-white shadow rounded-xl p-5 h-fit">
//   <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
//   <div className="flex justify-between mb-3">
//     <span>Total items:</span>
//     <span>{items.length}</span>
//   </div>
//   <div className="flex justify-between mb-3">
//     <span>Subtotal:</span>
//     <span>${itemsPrice.toFixed(2)}</span>
//   </div>
//   <button
//     onClick={() => router.push('/checkout')}
//     className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors duration-300"
//   >
//     Proceed to Checkout
//   </button>
// </div>
