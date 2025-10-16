import Productitem from "@/components/product/Productitem";
import data from "@/lib/data";
import { Metadata } from "next";
export const metadata:Metadata ={
  title : process.env.Next_PUBLIC_APP_NAME || 'Next Amazona V2',
  description: process.env.NEXT_APP_DESC || ' Next js ,'
}


export default function Home() {
  return <div className="p-5 md:px-10">
    <h2 className=""> Latest Products </h2>
    <div className=" grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {
        data?.products?.map(( product)=>
          <Productitem key={product.slug} product={product}/>
        )
      }
    </div> 
  </div>;
}
  