import Cookies from "js-cookie";

export const CallStripeSession = async (formdata) => {
  try {

  

    const res = await fetch("/api/stripe", {
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
