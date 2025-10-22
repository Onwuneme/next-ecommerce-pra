'use client';

export default function CheckoutSteps({ current = 0 }) {
  const steps = [
    'User Login',
    'Shipping Address',
    'Payment Method',
    'Place Order',
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mb-8 mt-6 px-2">
      <ul className="flex flex-col sm:flex-row items-center justify-between text-sm font-medium sm:space-x-2 md:space-x-4">
        {steps.map((step, index) => {
          const isActive = index <= current;
          const isLast = index === steps.length - 1;

          return (
            <li key={step} className="flex items-center w-full sm:w-auto relative">
              {/* Step Circle */}
              <div
                className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 text-xs font-semibold shrink-0 ${
                  isActive
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-gray-200 border-gray-300 text-gray-500'
                }`}
              >
                {index + 1}
              </div>

              {/* Step Label */}
              <span
                className={`ml-2 whitespace-nowrap ${
                  isActive ? 'text-blue-700 font-semibold' : 'text-gray-500'
                }`}
              >
                {step}
              </span>

              {/* Connector Line */}
              {!isLast && (
                <div
                  className={`flex-1 h-0.5 sm:h-1 mx-2 ${
                    index < current ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                ></div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
