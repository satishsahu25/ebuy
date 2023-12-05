import { productbycategory } from "@/app/api/services/product";
import CommonListingItem from "@/app/components/CommonListingItem";


export default async function getallwomenproducts(){


    const allprod=await productbycategory('women');

    return <CommonListingItem data={allprod&&allprod.data}/>

}