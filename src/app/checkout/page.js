"use client";

import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context";
import Notification from "../components/Notification";
import { getalladdresses } from "../api/services/address";
import { useRouter, useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { CallStripeSession } from "../api/services/stripe";
import { PulseLoader } from "react-spinners";
import { createNewOrder } from "../api/services/order";
import { toast } from "react-toastify";

export default function checkout() {
  const {
    cartitems,
    user,
    setshowcartmodal,
    addresses,
    checkoutFormData,
    setcheckoutFormData,
    setaddresses,
  } = useContext(GlobalContext);


  const [selectedAddress, setselectedAddress] = useState(null);
  const [isOrderprocessing, setisOrderprocessing] = useState(false);
  const router = useRouter();
  const [ordersuccess, setordersuccess] = useState(false);
  const params = useSearchParams();

  const Publishablekey ="pk_test_51O81YDSI2W7pYXmc8h2JfyIlISjmQOCgXZas2Df3hDYoGcuQdTNafo22uwzJ5yjkbekCotfyC64iKeup7ErnwnCV00bwEXR9pJ";
  const stripepromise = loadStripe(Publishablekey);



   //getting all addresses
  async function fetchalladdresses() {
    const res = await getalladdresses(user?._id);

    if (res.success) {
      setaddresses(res.data);
    } 
  }

  useEffect(() => {
    if (user) {
      fetchalladdresses();
    }
  }, [user]);
 //

  useEffect(() => {
    async function createfinalorder() {
      const isstripe = JSON.parse(localStorage.getItem("stripe"));

      if (
        isstripe &&
        params.get("status") === "success" &&
        cartitems &&
        cartitems.length > 0
      ) {
        setisOrderprocessing(true);
        const getcheckoutformdata = JSON.parse(
          localStorage.getItem("checkoutformdata")
        );

        const creatfinalcheckoutformdata = {
          user: user?._id,
          shippingAddress: getcheckoutformdata.shippingAddress,
          orderitems: cartitems.map((item) => ({
            qty: 1,
            product: item.productId,
          })),
          paymentMethod: "Stripe",
          totalPrice: cartitems.reduce(
            (total, item) => item.productId.price + total,
            0
          ),
          isPaid: true,
          isProcessing: true,
          paidAt: new Date(),
        };

        const res = await createNewOrder(creatfinalcheckoutformdata);
        console.log(res);
        console.log("object")
        if (res.success) {
          setisOrderprocessing(false);
          setordersuccess(true);
          
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          
          setisOrderprocessing(false);
          setordersuccess(false);
          
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }

     
    }
    createfinalorder();
  }, [params.get("status"), cartitems]);


  function handleSelectedAddress(getaddress) {
    if (getaddress._id === selectedAddress) {
      setselectedAddress(null);
      setcheckoutFormData({
        ...checkoutFormData,
        shippingAddress: {},
      });
      return;
    }

    setselectedAddress(getaddress._id);
    setcheckoutFormData({
      ...checkoutFormData,
      shippingAddress: {
        ...checkoutFormData.shippingAddress,
        fullname: getaddress.fullname,
        city: getaddress.city,
        country: getaddress.country,
        postalcode: getaddress.postalcode,
        address: getaddress.address,
      },
    });
  }

  async function handleCheckout() {
    const stripe = await stripepromise;

    const createLineItems = cartitems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          images: [item.productId.imageUrl],
          name: item.productId.name,
        },
        unit_amount: item.productId.price * 100,
      },
      quantity: 1,
    }));

    const res = await CallStripeSession(createLineItems);

    setisOrderprocessing(true);

    localStorage.setItem("stripe", true);
    localStorage.setItem("checkoutformdata", JSON.stringify(checkoutFormData));

    const { error } = await stripe.redirectToCheckout({
      sessionId: res.id,
    });
  }

  useEffect(() => {
    if (ordersuccess) {
      setTimeout(() => {
        router.push("/order");
      }, [2000]);
    }
  }, [ordersuccess]);


  if (ordersuccess) {
    return (
      <section className="h-screen bg-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
            <div className="bg-white shadow">
              <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
                <h1 className="font-bold text-lg">
                  Your payment is successfull and you will be redirected to
                  orders page in 3 seconds !
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isOrderprocessing) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={isOrderprocessing}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }






 

  return (
    <div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="font-medium text-xl">Cart Summary</p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-5">
            {cartitems && cartitems.length ? (
              cartitems.map((item) => (
                <div
                  className="flex flex-col rounded-lg bg-white sm:flex-row"
                  key={item._id}
                >
                  <img
                    src={item && item.productId && item.productId.imageUrl}
                    alt="Cart Item"
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-bold">
                      {item && item.productId && item.productId.name}
                    </span>
                    <span className="font-semibold">
                      {item && item.productId && item.productId.price}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div>Your cart is empty</div>
            )}
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Shipping address details</p>
          <p className="text-gray-400 font-bold">
            Complete your order by selecting address below
          </p>
          <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-6">
            {addresses && addresses.length ? (
              addresses.map((item) => (
                <div
                  onClick={() => handleSelectedAddress(item)}
                  key={item._id}
                  className={`border p-6 ${
                    item._id === selectedAddress ? "border-red-900" : ""
                  }`}
                >
                  <p>Name : {item.fullname}</p>
                  <p>Address : {item.address}</p>
                  <p>City : {item.city}</p>
                  <p>Country : {item.country}</p>
                  <p>PostalCode : {item.postalcode}</p>
                  <button className="mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                    {item._id === selectedAddress
                      ? "Selected Address"
                      : "Select Address"}
                  </button>
                </div>
              ))
            ) : (
              <p>No addresses added</p>
            )}
          </div>
          <button
            onClick={() => {
              router.push("/account");
              setshowcartmodal(false);
            }}
            className="mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
          >
            Add new address
          </button>
          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Subtotal</p>
              <p className="text-lg font-bold text-gray-900">
                $
                {cartitems && cartitems.length
                  ? cartitems.reduce(
                      (total, item) => item.productId.price + total,
                      0
                    )
                  : "0"}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Shipping</p>
              <p className="text-lg font-bold text-gray-900">Free</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-lg font-bold text-gray-900">
                $
                {cartitems && cartitems.length
                  ? cartitems.reduce(
                      (total, item) => item.productId.price + total,
                      0
                    )
                  : "0"}
              </p>
            </div>
            <div className="pb-10">
              <button
                disabled={
                  (cartitems && cartitems.length === 0) ||
                  Object.keys(checkoutFormData.shippingAddress).length === 0
                }
                onClick={handleCheckout}
                className="disabled:opacity-50 mt-5 mr-5 w-full  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
}
