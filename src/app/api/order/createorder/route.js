import Cart from "@/Models/cart";
import Order from "@/Models/order";
import Authuser from "@/middlewares/Authuser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const isauthuser = await Authuser(req);

    if (isauthuser) {
      const data = await req.json();
      const { user } = data;
      const savedorder = await Order.create(data);
      if (savedorder) {
        //delete all cart items for that user now;
        await Cart.deleteMany({ userId: user });

        return NextResponse.json({
          success: true,
          message: "Product are on the way...",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Order is not processed",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are nt authenticated",
      });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
