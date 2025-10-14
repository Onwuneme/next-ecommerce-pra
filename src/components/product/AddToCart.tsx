'use client';

import useCartService from '@/lib/hook/useCartStore';
import { OrderItem } from '@/lib/models/OrderModel';
import { useEffect, useState } from 'react';

export default function AddToCart({ item }: { item: OrderItem }) {

  const { items, increase ,decrease} = useCartService();
  const [existItem, setExistItem] = useState<OrderItem | undefined>();
  useEffect(() => {
    setExistItem(items.find((i) => i.slug === item.slug));
  }, [item, items]);
  const AddToCartHandler = () => {
    increase(item);
  };
  return existItem ? (
<div className="w-full flex items-center justify-center gap-4 mt-3 py-3">
  <button
    type="button"
    onClick={() => decrease(existItem)}
    className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors duration-300"
  >
    -
  </button>

  <span className="text-lg font-semibold text-gray-800 min-w-[2rem] text-center">
    {existItem.qty}
  </span>

  <button
    type="button"
    onClick={() => increase(existItem)}
    className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors duration-300"
  >
    +
  </button>
</div>

  ) : (
    <button
      type="button"
      onClick={AddToCartHandler}
      className="w-full py-3 mt-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-300"
    >
      Add to Cart
    </button>
  );
}
