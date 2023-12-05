import Cookies from "js-cookie";

export const addnewaddress = async (formdata) => {

 
  try {
    const res = await fetch("/api/address/addnewaddress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formdata),
    });

    const data = await res.json();
    
    return data;
  } catch (err) {
    
    console.log(err);
  }

  
};
export const deleteaddress = async (id) => {
  try {
    const res = await fetch(`/api/address/deleteaddress?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const getalladdresses = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/address/getalladdress?id=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const updateaddress = async (formdata) => {
  try {
    const res = await fetch(`/api/address/updateaddress`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formdata),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
