import { getAllAdminProducts } from "@/app/api/services/product";
import CommonListingItem from "@/app/components/CommonListingItem";

export default async function AllProducts(){

    const getallproducts=await getAllAdminProducts();



    return <CommonListingItem data={getallproducts&&getallproducts.data}/>
}