"use client";

import { addnewproduct, updateproduct } from "@/app/api/services/product";
import InputComponent from "@/app/components/Form/InputComponent";
import SelectComponent from "@/app/components/Form/SelectComponent";
import TileComponent from "@/app/components/Form/TileComponents";
import ComponentLevelLoader from "@/app/components/Loader/componentlevel";
import Notification from "@/app/components/Notification";
import { GlobalContext } from "@/app/context";
import {
  AvailableSizes,
  adminAddProductformControls,
  firebasestorageURl,
} from "@/app/utils";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/navigation";

import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";




const firebaseConfig = {
  apiKey: "AIzaSyCgfVDTN384eTCOtdIsIuQrRsadEeR9M8Q",
  authDomain: "ebuyecom-9fdf3.firebaseapp.com",
  projectId: "ebuyecom-9fdf3",
  storageBucket: "ebuyecom-9fdf3.appspot.com",
  messagingSenderId: "408886900448",
  appId: "1:408886900448:web:890c223f1c203d33c38285",
  measurementId: "G-8F7GNXSR0C"
  };


const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebasestorageURl);

const createuniquefilename = (getfile) => {
  const timestamps = Date.now();
  const randomstring = Math.random().toString(36).substring(2, 12);

  return `${getfile.name}-${timestamps}-${randomstring}`;
};

async function helperforUploadImagetoFirebase(file) {
  const filename = createuniquefilename(file);

  const storageReference = ref(storage, `ebuy/${filename}`);
  const uploadimage = uploadBytesResumable(storageReference, file);

  return new Promise((resolve, reject) => {
    uploadimage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadimage.snapshot.ref)
          .then((downloadurl) => resolve(downloadurl))
          .catch((error) => reject(error));
      }
    );
  });
}

const initialformdata = {
  name: "",
  description: "",
  category: "",
  price: 0,
  category: "men",
  sizes: [],
  onSale: "no",
  priceDrop: 0,
  imageUrl: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg",
};
export default function AdminAddNewProduct() {
  const [formdata, setformdata] = useState(initialformdata);

  const router = useRouter();

  const {
    complevelloader,
    setcomplevelloader,
    updatedcurrentproduct,
    setupdatedcurrentproduct,
  } = useContext(GlobalContext);

  async function handleImage(e) {
    // const extractImageUrl = await helperforUploadImagetoFirebase(
    //   e.target.files[0]
    // );  
    const extractImageUrl = "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
    if (extractImageUrl !== "") {
      setformdata({
        ...formdata,
        imageUrl: extractImageUrl,
        // imageUrl: extractImageUrl,
      });
    }
  }

  const handletileclick = (getcurrentitem) => {
    let cpysizes = [...formdata.sizes];

    const index = cpysizes.findIndex((item) => item.id === getcurrentitem.id);

    if (index === -1) {
      cpysizes.push(getcurrentitem);
    } else {
      cpysizes = cpysizes.filter((item) => item.id !== getcurrentitem.id);
    }

    setformdata({
      ...formdata,
      sizes: cpysizes,
    });
  };

  async function handleaddnewproduct() {
  
    setcomplevelloader({ loading: true, id: "" });
    const res =
      updatedcurrentproduct !== null
        ? await updateproduct(formdata)
        : await addnewproduct(formdata);

    console.log(res);

    if (res.success) {
      console.log("object")
      setcomplevelloader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setformdata(initialformdata);

      setupdatedcurrentproduct(null);

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

  useEffect(() => {
    if (updatedcurrentproduct !== null) setformdata(updatedcurrentproduct);
  }, [updatedcurrentproduct]);

  return (
    <div className="w-full mt-5 mr-0 mb-0 ml-0  relative">
      <div className="flex flex-col items-start bg-white shadow-2xl rounded-xl relative justify-start p-10">
        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
          <input
            accept="image/*"
            max="1000000"
            type="file"
            onChange={handleImage}
          />
          <div className="flex gap-2 flex-col">
            <label>Available sizes</label>
            <TileComponent
              selected={formdata.sizes}
              onClick={handletileclick}
              data={AvailableSizes}
            />
          </div>
          {adminAddProductformControls.map((item) =>
            item.componentType === "input" ? (
              <InputComponent
                type={item.type}
                placeholder={item.placeholder}
                label={item.label}
                value={formdata[item.id]}
                onChange={(e) => {
                  setformdata({
                    ...formdata,
                    [item.id]: e.target.value,
                  });
                }}
              />
            ) : item.componentType === "select" ? (
              <SelectComponent
                label={item.label}
                value={formdata[item.id]}
                onChange={(e) => {
                  setformdata({
                    ...formdata,
                    [item.id]: e.target.value,
                  });
                }}
                options={item.options}
              />
            ) : null
          )}

          <button
            onClick={handleaddnewproduct}
            className="inline-flex w-full  font-medium uppercase tracking-wide items-center justify-center bg-black px-6 py-4 text-lg text-white"
          >
            {complevelloader && complevelloader.loading ? (
              <ComponentLevelLoader
                text={
                  updatedcurrentproduct
                    ? "Updating Product..."
                    : "Adding product..."
                }
                color={"#ffffff"}
                loading={ComponentLevelLoader && complevelloader.loading}
              />
            ) : updatedcurrentproduct ? (
              "Update"
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </div>

      <Notification />
    </div>
  );
}
