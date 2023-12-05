//add new product

import Cookies from "js-cookie";

export const addnewproduct = async (formdata) => {
  try {
    const resp = await fetch("/api/admin/addproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formdata),
    });

    const data = await resp.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllAdminProducts = async () => {
  try {
    const res = await fetch("api/admin/allproducts", {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updateproduct = async (formdata) => {
  try {
    const res = await fetch("/api/admin/updateproduct", {
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

export const deletedproduct = async (id) => {
  try {
    const res = await fetch(`/api/admin/deleteproduct?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (err) {}
};

export const productbycategory = async (id) => {
  try {
    const res = await fetch(
      `api/admin/productbycategory?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const productbyid = async (id) => {
  try {
    const res = await fetch(
      `api/admin/product-by-id?id=${id}`,
      { method: "GET", cache: "no-store" }
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
