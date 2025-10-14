import { Product } from '@/lib/models/ProductModel';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


export default function Productitem({ product }: { product: Product }) {
  return (
 <div className="border rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-white">
  <figure className="relative">
    <Link href={`/product/${product.slug}`}>
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={300}
        className="object-cover w-full h-64 hover:scale-105 transition-transform duration-500"
      />
    </Link> 
  </figure>

  <div className="p-4 space-y-2">
    <Link href={`/product/${product.slug}`}>
      <h2 className="text-lg font-semibold hover:text-blue-600 transition-colors duration-300">
        {product.name}
      </h2>
    </Link>
    <p className="text-gray-500 text-sm">{product.brand}</p>

    <div className="flex items-center justify-between pt-2">
      <span className="text-xl font-bold text-gray-800">${product.price}</span>
      {/* <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
        Add to Cart
      </button> */}
    </div>
  </div>
</div>

  );
}
