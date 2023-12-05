import Cookies from "js-cookie";

export const createNewOrder = async (formdata) => {
  try {
    const res = await fetch("/api/order/createorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formdata),
    });

    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};


export const getallOrderforuser = async (id) => {
  try {

    const res = await fetch(`/api/order/getallorders?id=${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        }
      });
  
      const data = await res.json();
      return data;

  } catch (e) {
    console.log(e);
  }
};

export const getOrderdetailsforuser = async(id) => {
  try {

    const res = await fetch(`/api/order/orderdetails?id=${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        }
      });
  
      const data = await res.json();
      return data;

  } catch (e) {
    console.log(e);
  }
};


export const getallOrderforalluser = async (id) => {
  try {

    const res = await fetch(`/api/admin/order/getallorder`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        }
      });
  
      const data = await res.json();
      return data;

  } catch (e) {
    console.log(e);
  }
};


export const updatestatusoforder = async (formdata) => {
  try {
    
    const res = await fetch(`/api/admin/order/updateorder`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`
          
        },
        body:JSON.stringify(formdata)
      });
  
      const data = await res.json();
   
      return data;

  } catch (e) {
    console.log(e);
  }
};