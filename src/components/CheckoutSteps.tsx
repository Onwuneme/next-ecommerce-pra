
export default function CheckoutSteps({}) {
    const CheckoutSteps =({current = 0})=>{

        return (
          <ul>
            {['User Login', 'Shipping Address', 'Payment Method', 'place Order'].map(
                (step,index)=>(
                    <li
                    key={step}
                    >
                        {step}
                    </li>
            )
            )}
            
          </ul>
        )
    }
}
