"use client";

import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context";
import Notification from "../components/Notification";
import { addNewAddressFormControls } from "../utils";
import InputComponent from "../components/Form/InputComponent";
import ComponentLevelLoader from "../components/Loader/componentlevel";
import {
  addnewaddress,
  deleteaddress,
  getalladdresses,
  updateaddress,
} from "../api/services/address";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { useRouter } from "next/navigation";

export default function Account() {
  const {
    user,
    pagelevelloader,
    addressFormData,
    complevelloader,
    setcomplevelloader,
    setAddressFormData,
    setpagelevelloader,
    addresses,
    setaddresses,
  } = useContext(GlobalContext);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [currenteditedaddressId, setcurrenteditedaddressId] = useState(null);

 const router=useRouter();

  async function extractalladdress() {
    const res = await getalladdresses(user?._id);
    if (res.success) {
      console.log(res);
      setpagelevelloader(false);
      setaddresses(res.data);
    }
  }

  async function handleAddOrUpdateAddress() {
    setcomplevelloader({ loading: true, id: "" });

    const res =
      (currenteditedaddressId) !== null
        ? await updateaddress({ ...addressFormData, _id: currenteditedaddressId })
        :await addnewaddress({ ...addressFormData, userId: user?._id });

    if (res.success) {
      setcomplevelloader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });

      extractalladdress();
      setcurrenteditedaddressId(null);
    } else {
      setcomplevelloader({ loading: false, id: "" });
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });
    }
  }

  async function handleUpdateAddress(getitem) {
    setShowAddressForm(true);
    setAddressFormData({
      fullname: getitem.fullname,
      city: getitem.city,
      country: getitem.country,
      postalcode: getitem.postalcode,
      address: getitem.address,
    });
    setcurrenteditedaddressId(getitem._id);
  }

  async function handleDelete(id) {
    setcomplevelloader({ loading: true, id: id });
    const res = await deleteaddress(id);

    if (res.success) {
      setcomplevelloader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      extractalladdress();
    } else {
      setcomplevelloader({ loading: false, id: "" });
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  useEffect(() => {
    if (user) {
      extractalladdress();
    }
  }, [user]);


  return (
    <section>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="bg-white shadow">
          <div className="p-6 sm:p-12">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
              {/* {user iamge} */}
            </div>
            <div className="flex flex-col flex-1">
              <h4 className="text-lg font-semibold text-center md:text-left">
                {user?.name}
              </h4>
              <p>{user?.email}</p>
              <p>{user?.role}</p>
            </div>

            <button
              onClick={()=>router.push('/order')}
              className="mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
            >
              View Your Orders
            </button>
            <div className="mt-6">
              <h1 className="font-bold text-lg">Your Addresses :</h1>
              {pagelevelloader ? (
                <PulseLoader
                  color={"#000000"}
                  loading={pagelevelloader}
                  size={15}
                  data-testid="loader"
                />
              ) : (
                <div className="mt-4 flex flex-col gap-4">
                  {addresses && addresses.length ? (
                    addresses.map((item) => (
                      <div className="border p-6" key={item._id}>
                        <p>Name : {item.fullname}</p>
                        <p>Address : {item.address}</p>
                        <p>City : {item.city}</p>
                        <p>Country : {item.country}</p>
                        <p>PostalCode : {item.postalcode}</p>
                        <button
                          onClick={() => handleUpdateAddress(item)}
                          className="mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                        >
                          {complevelloader &&
                          complevelloader.loading &&
                          complevelloader.id === item._id ? (
                            <ComponentLevelLoader
                              text={"Deleting"}
                              color={"#ffffff"}
                              loading={
                                complevelloader && complevelloader.loading
                              }
                            />
                          ) : (
                            "Delete"
                          )}
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No address found ! Please add a new address below</p>
                  )}
                </div>
              )}
            </div>
            <div className="mt-4">
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
              >
                {showAddressForm ? "Hide Address Form" : "Add New Address"}
              </button>
            </div>
            {showAddressForm ? (
              <div className="flex flex-col mt-5 justify-center pt-4 items-center">
                <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                  {addNewAddressFormControls.map((controlItem) => (
                    <InputComponent
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={addressFormData[controlItem.id]}
                      onChange={(event) =>
                        setAddressFormData({
                          ...addressFormData,
                          [controlItem.id]: event.target.value,
                        })
                      }
                    />
                  ))}
                </div>
                <button
                  onClick={handleAddOrUpdateAddress}
                  className="mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                >
                  {complevelloader && complevelloader.loading ? (
                    <ComponentLevelLoader
                      text={"Saving"}
                      color={"#ffffff"}
                      loading={complevelloader && complevelloader.loading}
                    />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
