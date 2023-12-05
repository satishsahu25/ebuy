"use client";

import { useContext, useEffect, useState } from "react";
import InputComponent from "../components/Form/InputComponent";
import SelectComponent from "../components/Form/SelectComponent";
import { registrationFormCOntrols } from "../utils";
import { registeruser } from "../api/services/register";
import { GlobalContext } from "../context";
import ComponentLevelLoader from "../components/Loader/componentlevel";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Notification from "../components/Notification";

const initialState = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};

export default function Register() {
  const [formdata, setformdata] = useState(initialState);
  const [isregistered, setisregistered] = useState(false);
  const { pagelevelloader, setpagelevelloader,isauthuser } = useContext(GlobalContext);

  const router=useRouter();

  console.log(formdata);

  //applygin some valdiation from frontend in the form
  function isValidform() {
    return formdata &&
      formdata.name &&
      formdata.name.trim() !== "" &&
      formdata.email &&
      formdata.email.trim() !== "" &&
      formdata.password &&
      formdata.password.trim() !== ""&&formdata.password.length>5
      ? true
      : false;
  }

  async function handleregister() {
    setpagelevelloader(true);
    const data = await registeruser(formdata);

    if (data.success) {
      toast.success(data.message,{
        position:toast.POSITION.TOP_RIGHT
      });
      setisregistered(true);
      setpagelevelloader(false);
      setformdata(initialState);

    } else {
      setpagelevelloader(false);
      setformdata(initialState);
      toast.error(data.message,{
        position:toast.POSITION.TOP_RIGHT
      })
    }
  }

  useEffect(()=>{
    if(isauthuser){
      router.push('/');
    }
  },[isauthuser]);

  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between pt-0 pb-0 pl-10 mt-8 mr-auto  xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full mt-10 mb-0 mr-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl  font-medium text-center font-serif">
                {isregistered
                  ? "Registration Successful !"
                  : "Sign up for an account"}
              </p>
              {isregistered ? (
                <button className="inline-flex w-full items-center justify-center text-white transition-all focus:shadow uppercase tracking-wide font-medium ease-in-out duration-200  bg-black  px-6 py-4 text-large"
                onClick={()=>router.push('/login')}
                >
                  Login
                </button>
              ) : (
                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                  {registrationFormCOntrols.map((items) =>
                    items.componenttype === "input" ? (
                      <InputComponent
                        type={items.type}
                        placeholder={items.placeholder}
                        label={items.label}
                        value={formdata[items.id]}
                        onChange={(e) =>
                          setformdata({
                            ...formdata,
                            [items.id]: e.target.value,
                          })
                        }
                      />
                    ) : items.componenttype === "select" ? (
                      <SelectComponent
                        options={items.options}
                        label={items.label}
                        value={formdata[items.id]}
                        onChange={(e) =>
                          setformdata({
                            ...formdata,
                            [items.id]: e.target.value,
                          })
                        }
                      />
                    ) : null
                  )}
                  <button
                    disabled={!isValidform()}
                    className=" disabled:opacity-50 inline-flex w-full items-center justify-center text-white transition-all focus:shadow uppercase tracking-wide font-medium ease-in-out duration-200  bg-black  px-6 py-4 text-large"
                    onClick={handleregister}
                  >
                   {
                    pagelevelloader?<ComponentLevelLoader
                    text={"Registering"}
                    color={"#fff"}
                    loading={pagelevelloader}

                    />: "Register"
                   }
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Notification/>
    </div>
  );
}
