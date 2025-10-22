'use client';
import CheckoutSteps from '@/components/CheckoutSteps';
import useCartService from '@/lib/hook/useCartStore';
import { ShippingAddress } from '@/lib/models/OrderModel';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm, ValidationRule } from 'react-hook-form';

export default function Form() {
  const router = useRouter();
  const { saveShipping, shippingAdress,saveShippingAddress } =
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
    <div>
      <label htmlFor={id}>{name}</label>
      <input
        type="text"
        id={id}
        {...register(id, {
          required: required && `${name} is required`,
          pattern,
        })}
      />
      {errors[id]?.message && <div> {errors[id].message}</div>}
    </div>
  );
};
const formSubmit: SubmitHandler<ShippingAddress> = async (form) => {
saveShippingAddress(form);
router.push('/payment');
}
  return(
    <div>
        <CheckoutSteps current={1}/>
        <div className='max-w-sm mx-auto'>
            <div>
                <h2>Shipping Adress</h2>
                <form action="" onSubmit={{handleSubmit(formSubmit)}}></form>
            </div>

        </div>
    </div>
  )
}
