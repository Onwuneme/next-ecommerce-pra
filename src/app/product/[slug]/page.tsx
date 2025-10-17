import AddToCart from '@/components/product/AddToCart';
import data from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const product = data.products?.find((item) => item.slug === slug);
  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-600 text-lg font-medium">Product not found</p>
      </div>
    );
  }

  return (
    <div className="my-8 px-4 md:px-10 lg:px-20">
      <Link
        href="/"
        className="text-blue-600 hover:underline text-sm font-medium"
      >
        ← Back to Products
      </Link>

      <div className="grid lg:grid-cols-4 md:gap-8 mt-6">
        {/* Image Section */}
        <div className="md:col-span-2 flex items-center justify-center bg-gray-50 rounded-2xl p-4">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vw"
            className="rounded-xl object-cover w-full h-auto hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-5 p-5">
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-yellow-500 font-semibold">
            ⭐ {product.rating} / 5 ({product.numReviews} reviews)
          </p>
          <p className="text-gray-500 text-sm">Brand: {product.brand}</p>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* Purchase Card */}
        <div className="h-fit p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="mb-4 flex justify-between text-gray-700">
            <span className="font-medium">Price</span>
            <span className="font-semibold text-xl text-gray-900">
              ${product.price}
            </span>
          </div>

          <div className="mb-4 flex justify-between text-gray-700">
            <span className="font-medium">Status</span>
            <span
              className={`font-semibold ${
                product.countInStock > 0
                  ? 'text-green-600'
                  : 'text-red-500'
              }`}
            >
              {product.countInStock > 0 ? 'In Stock' : 'Unavailable'}
            </span>
          </div>
          <AddToCart item={{...product,qty:0,color:"",size:""}}/>
        </div>
      </div>
    </div>
  );
}
