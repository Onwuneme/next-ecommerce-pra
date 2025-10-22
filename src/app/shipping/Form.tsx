'use client';
import CheckoutSteps from '@/components/CheckoutSteps';
import useCartService from '@/lib/hook/useCartStore';
import { ShippingAddress } from '@/lib/models/OrderModel';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm, ValidationRule } from 'react-hook-form';

export default function Form() {
  const router = useRouter();
  const { saveShipping, shippingAdress, saveShippingAddress } =
    useCartService();
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
    setValue('fullName', shippingAdress.fullName);
    setValue('address', shippingAdress.address);
    setValue('city', shippingAdress.city);
    setValue('postalCode', shippingAdress.postalCode);
    setValue('country', shippingAdress.country);
  }, [setValue, shippingAdress]);

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
    <div className="mb-4">
      <label htmlFor={id} className="block font-medium mb-1">
        {name}
      </label>
      <input
        type="text"
        id={String(id)}
        {...register(id, {
          required: required && `${name} is required`,
          pattern,
        })}
        className="w-full border rounded px-3 py-2"
      />
      {errors[id]?.message && (
        <div className="text-red-500 text-sm mt-1">
          {String(errors[id]?.message)}
        </div>
      )}
    </div>
  );

  const formSubmit: SubmitHandler<ShippingAddress> = async (form) => {
    saveShippingAddress(form);
    router.push('/payment');
  };

  return (
    <div>
      <CheckoutSteps current={1} />
      <div className="max-w-sm mx-auto">
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <form onSubmit={handleSubmit(formSubmit)}>
            <FormInput id="fullName" name="Full name" required />
            <FormInput id="address" name="Address" required />
            <FormInput id="city" name="City" required />
            <FormInput id="postalCode" name="Postal code" required />
            <FormInput id="country" name="Country" required />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 mt-2 rounded text-white ${
                isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Saving...' : 'Continue'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
