
import Cookies from "js-cookie";

export const addtocart=async(formData)=>{

    try{
        const res=await fetch("/api/cart/addtocart",{
            method: "POST",
            headers:{
                'content-Type': 'application/json',
                Authorization:`Bearer ${Cookies.get('token')}`,
            },
            body:JSON.stringify(formData)
        });

        const data=res.json();
        return data;

    }catch(err){
        console.log(err);

    }
}
export const getallcartitems=async(id)=>{
    console.log(id);
    try{
        const res=await fetch(`api/cart/allcartitems?id=${id}`,{
            method: "GET",
            headers:{
                Authorization:`Bearer ${Cookies.get('token')}`,
            }
        });
      

        const data=await res.json();
        console.log(data);
        return data;

    }catch(err){
        console.log(err);
    }
}

export const deletefromcart=async(id)=>{

    try{
        const res=await fetch(`/api/cart/deletefromcart?id=${id}`,{
            method: "DELETE",
            headers:{
                Authorization:`Bearer ${Cookies.get('token')}`,
            }
        });

        const data=await res.json();
        return data;

    }catch(err){
        console.log(err);

    }
}

