"use client";

import { useRouter } from "next/navigation";
import InputComponent from "../components/Form/InputComponent";
import { loginFormcontrols } from "../utils";
import { useContext, useEffect, useState } from "react";
import { login } from "../api/services/login";
import { GlobalContext } from "../context";
import Cookies from "js-cookie";
import ComponentLevelLoader from "../components/Loader/componentlevel";
import Notification from "../components/Notification";
import { toast } from "react-toastify";

const initialformdata = {
  email: "",
  password: "",
};

export default function Login() {
  const {
    isauthuser,
    user,
    setuser,
    setisauthuser,
    complevelloader,
    setcomplevelloader,
  } = useContext(GlobalContext);
  const router = useRouter();

  const [formdata, setformdata] = useState(initialformdata);

  function isvalidformdata() {
    return (
      formdata &&
      formdata.email &&
      formdata.email.trim() !== "" &&
      formdata.password &&
      formdata.password.trim() !== ""
    );
  }

  console.log(formdata);

  const handlelogin = async () => {
    setcomplevelloader({ loading: true, id: "" });

    const resp = await login(formdata);


    if (resp.success) {
      toast.success(resp.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setisauthuser(true);
      setuser(resp.finaldata?.user);
      setformdata(initialformdata);
      Cookies.set("token", resp.finaldata?.token);
      localStorage.setItem("user", JSON.stringify(resp.finaldata?.user));
      setcomplevelloader({ loading: false, id: "" });
    } else {
      toast.error(resp.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setisauthuser(false);
      setcomplevelloader({ loading: false, id: "" });
    }
  };

  
  useEffect(() => {
    if (isauthuser){
      router.push("/");
    }
  }, [isauthuser]);

  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between pt-0 pb-0 pl-10 mt-8 mr-auto  xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full mt-10 mb-0 mr-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl  font-medium text-center font-serif">
                Login
              </p>

              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                {loginFormcontrols.map((controlItem) =>
                  controlItem.componenttype === "input" ? (
                    <InputComponent
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={formdata[controlItem.id]}
                      onChange={(e) =>
                        setformdata({
                          ...formdata,
                          [controlItem.id]: e.target.value,
                        })
                      }
                    />
                  ) : null
                )}
              </div>

              <button
                disabled={!isvalidformdata()}
                onClick={handlelogin}
                className=" disabled:opacity-50 inline-flex w-full items-center justify-center text-white transition-all focus:shadow uppercase tracking-wide font-medium ease-in-out duration-200  bg-black mt-5  px-6 py-4 text-large"
              >
                {complevelloader && complevelloader.loading ? (
                  <ComponentLevelLoader
                    text={"Logging in..."}
                    color={"#fff"}
                    loading={complevelloader && complevelloader.loading}
                  />
                ) : (
                  "Login"
                )}
              </button>

              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                <p>New to website ?</p>
                <button
                  className="inline-flex w-full items-center justify-center text-white transition-all focus:shadow uppercase tracking-wide font-medium ease-in-out duration-200  bg-black  px-6 py-4 text-large
                     "
                  onClick={() => router.push("/register")}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
}
