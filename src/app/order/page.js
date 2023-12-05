"use client";

import { useContext, useEffect } from "react";
import { GlobalContext } from "../context";
import { getallOrderforuser } from "../api/services/order";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import Notification from "../components/Notification";
import { useRouter } from "next/navigation";

export default function orders() {
  const {
    user,
    pagelevelloader,
    setpagelevelloader,
    allorderforuser,
    setallorderforuser,
  } = useContext(GlobalContext);

  async function extractAllorders() {
    setpagelevelloader(true);

    const res = await getallOrderforuser(user?._id);

    if (res.success) {
      setpagelevelloader(false);
      setallorderforuser(res.data);
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setpagelevelloader(false);
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  useEffect(() => {
    if (user !== null) extractAllorders();
  }, [user]);

  if (pagelevelloader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={pagelevelloader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }


  const router=useRouter();



  return (
    <>
    <section>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div>
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                {allorderforuser && allorderforuser.length ? (
                  <ul className="flex flex-col gap-4">
                    {allorderforuser.map((item) => (
                      <li
                        key={item._id}
                        className="bg-gray-200 shadow p-5 flex flex-col space-y-3 py-6 text-left"
                      >
                        <div className="flex">
                          <h1 className="font-bold text-lg mb-3 flex-1">
                            #order: {item._id}
                          </h1>
                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">
                              Total paid amount
                            </p>
                            <p className="mr-3 text-2xl  font-semibold text-gray-900">
                              ${item.totalPrice}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {item.orderitems.map((orderItem, index) => (
                            <div key={index} className="shrink-0">
                              <img
                                alt="Order Item"
                                className="h-24 w-24 max-w-full rounded-lg object-cover"
                                src={
                                  orderItem &&
                                  orderItem.product &&
                                  orderItem.product.imageUrl
                                }
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-5">
                          <button className="disabled:opacity-50 mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                            {item.isProcessing
                              ? "Order is Processing"
                              : "Order is delivered"}
                          </button>
                          <button
                            onClick={() => router.push(`/order/${item._id}`)}
                            className=" mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                          >
                            View Order Details
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : "No orders found"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </section>
    </>
  );
}
