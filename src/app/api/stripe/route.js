import Authuser from "@/middlewares/Authuser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const stripe = require("stripe")(process.env.SECRET_KEY
);

export async function POST(req) {
  try {
    const isauthuser = await Authuser(req);
    if (isauthuser) {
      const res = await req.json();
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: res,
        mode: "payment",
        success_url: "https://ebuy-three.vercel.app/checkout" + "?status=success",
        cancel_url: "https://ebuy-three.vercel.app/checkout" + "?status=cancel",
      });

      return NextResponse.json({
        success: true,
        id: session.id,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized",
      });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
