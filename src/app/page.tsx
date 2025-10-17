import Productitem from '@/components/product/Productitem';
import data from '@/lib/data';
import productService from '@/lib/services/productService';
import { Metadata } from 'next';
import FeaturedSlider from '@/components/product/FeaturedSlider';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'Next Amazona V2',
  description: process.env.NEXT_PUBLIC_APP_DESC || 'Next.js eCommerce site',
};

export default async function Home() {
  const featuredProducts = await productService.getFeatured();
  const latestProducts = await productService.getLatest();

  return (
    <div className="p-5 md:px-10">
      <FeaturedSlider featuredProducts={featuredProducts} />

      {/* Latest Products Section */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Latest Products</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <Productitem key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
{
  /* <div className="relative w-full h-[50vh] rounded-xl shadow-lg overflow-hidden">
  {featuredProducts.map((product, index) => (
    <div
      key={product._id}
      id={`slide-${index}`}
      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
        index === 0 ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.banner}
          alt={product.name}
          className="object-cover rounded-xl w-full h-[400px] md:h-[500px]"
        />
      </Link>

      <div className="absolute flex justify-between items-center w-full top-1/2 transform -translate-y-1/2 px-5">
        <a
          href={`#slide-${
            index === 0 ? featuredProducts.length - 1 : index - 1
          }`}
          className="bg-black/40 text-white p-3 rounded-full hover:bg-black transition"
        >
          <IoIosArrowBack size={24} />
        </a>
        <a
          href={`#slide-${
            index === featuredProducts.length - 1 ? 0 : index + 1
          }`}
          className="bg-black/40 text-white p-3 rounded-full hover:bg-black transition"
        >
          <IoIosArrowForward size={24} />
        </a>
      </div>

      <div className="absolute bottom-5 left-5 bg-black/50 text-white px-4 py-2 rounded-md">
        <h2 className="text-lg font-semibold">{product.name}</h2>
      </div>
    </div>
  ))}
</div>  */
}
