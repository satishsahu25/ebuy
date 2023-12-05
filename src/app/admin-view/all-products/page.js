'use client';

import { getAllAdminProducts } from "@/app/api/services/product";
import CommonListingItem from "@/app/components/CommonListingItem";


export default async function AdminAllProducts(){


    const alladminproducts=await getAllAdminProducts();
 

    return (<CommonListingItem data={alladminproducts&&alladminproducts.data}/>)
    

}