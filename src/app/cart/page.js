"use client";

import { useContext, useEffect } from "react";
import { deletefromcart, getallcartitems } from "../api/services/cart";
import { GlobalContext } from "../context";
import CommonCart from "../components/CommonCart";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function Cart() {
  const {
    user,
    cartitems,
    setcartitems,
    setcomplevelloader,
    complevelloader,
    pagelevelloader,
    setpagelevelloader,
  } = useContext(GlobalContext);

  async function extractAllCartitems() {
    setpagelevelloader(true);

    const res = await getallcartitems(user._id);
    console.log(res);

    if (res&&res.success) {
      setpagelevelloader(false);
      setcartitems(res.data);
      localStorage.setItem("cartitems", JSON.stringify(res.data));
    }
  }

  const handleDeleteCartItem = async (id) => {
    setcomplevelloader({ loading: true, id: id });
    const res = await deletefromcart(id);

    if (res.success) {
      setcomplevelloader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      //After deleting we again call the remaining cart items
      extractAllCartitems();
    } else {
      setcomplevelloader({ loading: false, id: "" });
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    if (user) {
      extractAllCartitems();
    }
  }, [user]);

  if (pagelevelloader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000"}
          loading={pagelevelloader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return <CommonCart complevelloader={complevelloader} handleDeleteCartItem={handleDeleteCartItem} cartItems={cartitems} />;
}
