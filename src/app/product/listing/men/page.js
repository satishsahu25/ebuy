import { productbycategory } from "@/app/api/services/product";
import CommonListingItem from "@/app/components/CommonListingItem";


export default async function getallwomenproducts(){


    const allprod=await productbycategory('men');

    return <CommonListingItem data={allprod&&allprod.data}/>

}