"use client";

import { deletedproduct } from "@/app/api/services/product";
import { GlobalContext } from "@/app/context";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../../Loader/componentlevel";
import { addtocart, getallcartitems } from "@/app/api/services/cart";

export default function ProductButton({ item }) {
  const pathname = usePathname();
  const isadminview = pathname.includes("admin-view");

  const router = useRouter();
  const { setupdatedcurrentproduct,showcartmodal,
    setshowcartmodal, user,complevelloader, setcomplevelloader } =
    useContext(GlobalContext);

  const handleupdateclick = () => {
    setupdatedcurrentproduct(item);
    router.push("/admin-view/add-product");
  };

  async function handledeleteclick(id) {
    const res = await deletedproduct(id);
    setcomplevelloader({ loading: true, id: id });

    if (res.success) {
     
      setcomplevelloader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      
      router.refresh();

      setTimeout(() => {
        router.push("/admin-view/all-products");
      }, 1000);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    
      setcomplevelloader({ loading: false, id: "" });
    }
  }

  const handleaddtocart=async(getitem)=>{
  
    setcomplevelloader({loading:true,id:getitem._id})

    const res=await addtocart({
      userId:user._id,
      productId: getitem._id
    });


    if(res.success){
      setshowcartmodal(true);
      setcomplevelloader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }else{
      setshowcartmodal(true);
      setcomplevelloader({ loading: false, id: "" });
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

  }

  return isadminview ? (
    <>
      <button
        key={item.id}
        onClick={handleupdateclick}
        className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
      >
        Update
      </button>
      <button
        onClick={() => handledeleteclick(item._id)}
        className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
      >
        {complevelloader &&
        complevelloader.loading &&
        item._id === complevelloader.id ? (
          <ComponentLevelLoader
            text={"Deleting product..."}
            color={"#ffffff"}
            loading={ComponentLevelLoader && complevelloader.loading}
          />
        ) : (
          "Delete"
        )}
      </button>
    </>
  ) : (
    <>
      <button 
      onClick={()=>handleaddtocart(item)}
      className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
         {complevelloader &&
        complevelloader.loading &&
        item._id === complevelloader.id ? (
          <ComponentLevelLoader
            text={"Adding to cart..."}
            color={"#ffffff"}
            loading={ComponentLevelLoader && complevelloader.loading}
          />
        ) : (
          "Add to Cart"
        )}
      </button>
    </>
  );
}
