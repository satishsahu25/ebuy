import { productbyid } from "@/app/api/services/product"
import Commondetails from "@/app/components/Commondetails";

export default async function ProductDetails({params}){


    const productdetailsdata=await productbyid(params.details);



    return <Commondetails
        item={productdetailsdata&&productdetailsdata.data}
    />
}