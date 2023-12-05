"use client";

import { Fragment, useContext, useEffect } from "react";
import CommonModal from "../CommanModal/CommonModal";
import { GlobalContext } from "@/app/context";
import { deletefromcart, getallcartitems } from "@/app/api/services/cart";
import ComponentLevelLoader from "../Loader/componentlevel";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CartModal() {




  const router=useRouter();
  const {
    showcartmodal,
    user,
    setshowcartmodal,
    cartitems,
    complevelloader,
    setcomplevelloader,
    setcartitems,
  } = useContext(GlobalContext);

  
  async function extractAllCartitems() {
    const res = await getallcartitems(user._id);

    if (res&&res.success) {
   
      setcartitems(res.data);
      localStorage.setItem("cartitems", JSON.stringify(res.data));
    }
  }

  console.log(cartitems);

  const handleDeleteCartItem=async(id)=>{

    setcomplevelloader({loading: true,id:id});
    const res=await deletefromcart(id);

    if(res.success) {
        setcomplevelloader({loading: false,id:''});
        toast.success(res.message,{
            position:toast.POSITION.TOP_RIGHT
        });

        //After deleting we again call the remaining cart items
        extractAllCartitems();
    }else{
        setcomplevelloader({loading: false,id:''});
        toast.error(res.message,{
            position:toast.POSITION.TOP_RIGHT
        });

    }

  }

  useEffect(() => {
    if (user) {
      extractAllCartitems();
    }
  }, []);

  return (
    <CommonModal
      show={showcartmodal}
      setShow={setshowcartmodal}
      showButtons={true}
      mainContent={
        cartitems && cartitems.length ? (
          <ul role="list" className="my-6 divide-y divide-gray-300">
            {cartitems.map((item) => (
              <li key={item.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item && item.productId && item.productId.imageUrl}
                    alt="cart item"
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a>{item && item.productId && item.productId.name}</a>
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      ${item && item.productId && item.productId.price}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <button
                      type="button"
                      className="font-medium text-yellow-600 sm:order-2"
                        onClick={() => handleDeleteCartItem(item._id)}
                    >
                      {complevelloader &&
                      complevelloader.loading &&
                      complevelloader.id === item._id ? (
                        <ComponentLevelLoader
                          text={"Removing..."}
                          color={"#000000"}
                          loading={complevelloader && complevelloader.loading}
                        />
                      ) : (
                        "Remove"
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : null
      }
      buttonComponent={
        <Fragment>
          <button
            type="button"
            onClick={() => {
              router.push("/cart");
              setshowcartmodal(false);
            }}
            className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
          >
            Go to Cart
          </button>
          <button
            type="button"
            disabled={cartitems&&cartitems.length===0}
            className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide disabled:opacity-50"
            onClick={() => {
                router.push("/checkout");
              setshowcartmodal(false);
            }}
          >
            Checkout
          </button>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
            <button type="button" 
            onClick={()=>{
              setshowcartmodal(false);
              router.push("/");
            }}
            className="font-medium text-grey">
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </div>
        </Fragment>
      }
    />
  );
}
