"use client";

import { Fragment, useContext, useEffect } from "react";
import { adminNavOptions, navOptions } from "../utils";
import { GlobalContext } from "../context";
import CommonModal from "./CommanModal/CommonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "./CartModal";

function Navitems({ ismodalview = false, isadminview, router }) {
  return (
    <div
      className={`items-center justify-between w-full md:flex ${
        ismodalview ? "border-none" : "hidden"
      } md:w-auto`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col md:p-0 p-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
          ismodalview ? "" : "border border-gray-100"
        }`}
      >
        {isadminview
          ? adminNavOptions.map((item, i) => {
              return (
                <li
                  key={i}
                  onClick={() => router.push(item.path)}
                  className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                >
                  {item.label}
                </li>
              );
            })
          : navOptions.map((item, i) => {
              return (
                <li
                  key={i}
                  onClick={() => router.push(item.path)}
                  className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                >
                  {item.label}
                </li>
              );
            })}
      </ul>
    </div>
  );
}

export default function Navbar() {
  const {
    user,
    isauthuser,
    setuser,
    setisauthuser,
    setupdatedcurrentproduct,
    updatedcurrentproduct,
    showmodal,
    setshowmodal,
    showcartmodal,
    setshowcartmodal,
  } = useContext(GlobalContext);

  //getting data from the path/url

  const pathname = usePathname();

  const isadminview = pathname.includes("admin-view");

  const router = useRouter();

  useEffect(() => {
    if (
      pathname !== "/admin-view/add-product" &&
      updatedcurrentproduct !== null
    ) {
      setupdatedcurrentproduct(null);
    }
  }, [pathname]);

  const handlelogout = () => {
    setisauthuser(false);
    setuser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  };

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-2 border-gray-200">
        <div className="p-2 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
          <div
            onClick={() => router.push("/")}
            className="flex items-center cursor-pointer"
          >
            <span className="self-center text-black text-2xl font-semibold whitespace-nowrap">
              Ebuy
            </span>
          </div>

          <div className="flex md:order-2 gap-2">
            {!isadminview && isauthuser ? (
              <>
                <Fragment>
                  <button
                  onClick={()=>{router.push("/account")}}
                    className={
                      "mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                    }
                  >
                    Account
                  </button>
                  <button
                    onClick={() => setshowcartmodal(true)}
                    className={
                      "mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                    }
                  >
                    Cart
                  </button>
                </Fragment>
              </>
            ) : null}
            {user?.role === "admin" ? (
              isadminview ? (
                <button
                  className={
                    "mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  }
                  onClick={() => router.push("/")}
                >
                  Client View
                </button>
              ) : (
                <button
                  onClick={() => router.push("/admin-view")}
                  className={
                    "mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  }
                >
                  Admin View
                </button>
              )
            ) : null}
            {isauthuser ? (
              <button
                className={
                  "mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                }
                onClick={handlelogout}
              >
                Logout
              </button>
            ) : (
              <button
                className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
            )}

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setshowmodal(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <Navitems isadminview={isadminview} router={router} />
        </div>
      </nav>

      <CommonModal
        mainContent={
          <Navitems
            router={router}
            isadminview={isadminview}
            ismodalview={true}
          />
        }
        show={showmodal}
        setShow={setshowmodal}
      />
      {showcartmodal && <CartModal />}
    </>
  );
}
