"use client";

import { useContext, useEffect } from "react";
import { GlobalContext } from "../context";
import {
  getallOrderforalluser,
  updatestatusoforder,
} from "../api/services/order";
import Notification from "../components/Notification";
import { PulseLoader } from "react-spinners";
import ComponentLevelLoader from "../components/Loader/componentlevel";

export default function AdminView() {
  const {
    allorderforuser,
    pagelevelloader,
    setpagelevelloader,
    user,
    setallorderforuser,
    complevelloader,
    setcomplevelloader,
  } = useContext(GlobalContext);

  async function extractallordersforalluser() {
    setpagelevelloader(true);
    const res = await getallOrderforalluser();

    if (res.success) {
      setpagelevelloader(false);
      setallorderforuser(
        res.data && res.data.length
          ? res.data.filter((item) => item.user._id !== user._id)
          : []
      );
    } else {
      setpagelevelloader(false);
    }
  }

  useEffect(() => {
    if (user !== null) extractallordersforalluser();
  }, [user]);

  async function handleUpdateOrderStatus(getItem) {
    setcomplevelloader({ loading: true, id: getItem._id });

    const res = await updatestatusoforder({
      ...getItem,
      isProcessing: false,
    });
    //    console.log(getItem)
    if (res.success) {
      setcomplevelloader({ loading: false, id: "" });
      extractallordersforalluser();
    } else {
      setcomplevelloader({ loading: false, id: "" });
    }
  }

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

  return (
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
                          <div>
                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">
                              User Name :
                            </p>
                            <p className="mr-3 text-lg  font-semibold text-gray-900">
                              {item?.user?.name}
                            </p>
                          </div>

                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">
                              Email :
                            </p>
                            <p className="mr-3 text-lg  font-semibold text-gray-900">
                              {item?.user?.email}
                            </p>
                          </div>

                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">
                              Total Paid :
                            </p>
                            <p className="mr-3 text-lg  font-semibold text-gray-900">
                              ${item?.totalPrice}
                            </p>
                          </div>
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
                            onClick={() =>
                              // router.push(`/order/${item._id}`);
                              handleUpdateOrderStatus(item)
                            }
                            disabled={!item.isProcessing}
                            className=" mt-5 mr-5 disabled:opacity-50 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                          >
                            {complevelloader &&
                            complevelloader.loading &&
                            complevelloader.id === item._id ? (
                              <ComponentLevelLoader
                                text={"Updating Order Status"}
                                color={"#ffffff"}
                                loading={
                                  complevelloader && complevelloader.loading
                                }
                              />
                            ) : (
                              "Update Order Status"
                            )}
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
