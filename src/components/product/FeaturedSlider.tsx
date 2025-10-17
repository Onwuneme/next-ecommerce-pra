'use client';

import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/models/ProductModel';



export default function FeaturedSlider({ featuredProducts }:{featuredProducts:Product[]}) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? featuredProducts.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === featuredProducts.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative w-full h-[200px] md:h-[400px] overflow-hidden rounded-xl shadow-lg">
      {featuredProducts.map((product, index) => (
        <div
          key={product._id}
          className={`absolute w-full transition-opacity duration-700 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Link href={`/product/${product.slug}`}>
            <Image
              src={product.banner}
              alt={product.name}
              width={1200}
              height={500}
              className="object-cover w-full h-[400px] md:h-[400px] rounded-xl"
            />
          </Link>

          {/* Overlay product name (optional) */}
          <div className="absolute bottom-5 left-5 bg-black/50 text-white px-4 py-2 rounded-md">
            <h2 className="text-lg font-semibold">{product.name}</h2>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <div className="absolute flex justify-between items-center w-full top-1/2 transform -translate-y-1/2 px-5">
        <button
          onClick={prevSlide}
          className="bg-black/40 text-white p-3 rounded-full hover:bg-black transition"
          aria-label="Previous slide"
        >
          <IoIosArrowBack size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="bg-black/40 text-white p-3 rounded-full hover:bg-black transition"
          aria-label="Next slide"
        >
          <IoIosArrowForward size={24} />
        </button>
      </div>
    </div>
  );
}
