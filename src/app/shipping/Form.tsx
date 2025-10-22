'use client';
import CheckoutSteps from '@/components/CheckoutSteps';
import useCartService from '@/lib/hook/useCartStore';
import { ShippingAddress } from '@/lib/models/OrderModel';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm, ValidationRule } from 'react-hook-form';

export default function Form() {
  const router = useRouter();
  const { shippingAddress, saveShippingAddress } = useCartService();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ShippingAddress>({
    defaultValues: {
      fullName: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
  });

  useEffect(() => {
    Object.entries(shippingAddress || {}).forEach(([key, value]) => {
      setValue(key as keyof ShippingAddress, value);
    });
  }, [setValue, shippingAddress]);

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof ShippingAddress;
    name: string;
    required?: boolean;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block text-gray-700 font-semibold mb-1 text-sm"
      >
        {name}
      </label>
      <input
        type="text"
        id={String(id)}
        {...register(id, {
          required: required && `${name} is required`,
          pattern,
        })}
        placeholder={`Enter your ${name.toLowerCase()}`}
        className={`w-full border ${
          errors[id] ? 'border-red-500' : 'border-gray-300'
        } rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 ${
          errors[id]
            ? 'focus:ring-red-400'
            : 'focus:ring-blue-500 focus:border-blue-500'
        } transition duration-200`}
      />
      {errors[id]?.message && (
        <p className="text-red-500 text-xs mt-1">
          {String(errors[id]?.message)}
        </p>
      )}
    </div>
  );

  const formSubmit: SubmitHandler<ShippingAddress> = async (form) => {
    saveShippingAddress(form);
    router.push('/payment');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <CheckoutSteps current={1} />
      <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Shipping Address
        </h2>

        <form onSubmit={handleSubmit(formSubmit)} className="space-y-3">
          <FormInput id="fullName" name="Full Name" required />
          <FormInput id="address" name="Address" required />
          <FormInput id="city" name="City" required />
          <FormInput id="postalCode" name="Postal Code" required />
          <FormInput id="country" name="Country" required />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg text-white font-semibold text-sm transition-all duration-300 flex justify-center items-center gap-2 ${
              isSubmitting
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
            }`}
          >
            {isSubmitting && (
              <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
            )}
            {isSubmitting ? 'Saving...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}
