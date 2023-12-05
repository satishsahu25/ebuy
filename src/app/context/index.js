"use client";

import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();


export const intitialCheckoutformdata={
        shippingAddress:{},
        paymentMethod:'',
        totalPrice:0,
        isPaid:false,
        paidAt:new Date(),
        isProcessing:true
}




//STATES TO MAKE AVILABLE TO WHOLE APP

export default function GlobalState({ children }) {
  const [showmodal, setshowmodal] = useState(false);
  const [pagelevelloader, setpagelevelloader] = useState(false);
  const [complevelloader, setcomplevelloader] = useState({loading:false,id:''});
  const [isauthuser, setisauthuser] = useState(null);
  const [updatedcurrentproduct,setupdatedcurrentproduct]=useState(null);
  const [user, setuser] = useState(null);
  const [showcartmodal,setshowcartmodal]=useState(false);
  const [checkoutFormData,setcheckoutFormData] = useState(intitialCheckoutformdata);
 const [addressFormData, setAddressFormData] = useState({
  fullName: "",
  city: "",
  country: "",
  postalCode: "",
  address: "",
});
const [addresses,setaddresses]=useState([]);
const [cartitems,setcartitems]=useState([]);


  const protectedroute=[
    '/cart',
    '/checkout',
    '/account',
    '/order',
    '/admin-view',
    '/admin-view/add-product',
    '/admin-view/all-products',
  ];

  const protectedadminroute=[
    '/admin-view',
    '/admin-view/add-product',
    '/admin-view/all-products',
  ];


  const [orderdetails,setorderdetails]=useState(null);




  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setisauthuser(true);
      const userdata = JSON.parse(localStorage.getItem("user") || {});
      const getcartitems =JSON.parse(localStorage.getItem("cartitems"));
      setuser(userdata);
      setcartitems(getcartitems);
    } else {
      setuser({}); //unauthenticated user
      setisauthuser(false);
    }
  }, [Cookies]);


const router=useRouter();
const pathname=usePathname();

const [allorderforuser,setallorderforuser]=useState([]);


  useEffect(()=>{ 

    if(
      pathname!=='/register'&&pathname!=='/'&&
      user&&Object.keys(user).length===0&&protectedroute.indexOf(pathname)>-1){
        router.push('/login');
    }

  },[user,pathname]);


  useEffect(()=>{

    if(user!==null&&Object.keys(user).length>0&&user?.role!=='admin'
    &&protectedadminroute.indexOf(pathname)>-1){

      router.push('/unauthorizedpage');

    }

  },[user,pathname]);



  return (
    <GlobalContext.Provider
      value={{
        showmodal,
        isauthuser,
        user,
        setuser,
        setisauthuser,
        setshowmodal,
        addressFormData, setAddressFormData,
        updatedcurrentproduct,setupdatedcurrentproduct,
        pagelevelloader,
        setpagelevelloader,
        complevelloader, 
        allorderforuser,setallorderforuser,
        setcomplevelloader,
        cartitems,setcartitems,
        showcartmodal,
        setshowcartmodal,
        orderdetails,setorderdetails,
        addresses,setaddresses,
        checkoutFormData,setcheckoutFormData,
        allorderforuser,setallorderforuser
        
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
