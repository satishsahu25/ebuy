import Order from "@/Models/order";
import connecttoDB from "@/database";
import Authuser from "@/middlewares/Authuser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connecttoDB();

    const isauthuser = await Authuser(req);
    console.log(isauthuser)

    if (isauthuser?.role === "admin") {
      const {
        _id,
        shippingAddress,
        orderitems,
        paymentMethod,
        isPaid,
        paidAt,
        isProcessing,
      } = await req.json();
   

      const updateorder = await Order.findByIdAndUpdate(
        { _id: _id },
        {
      
          shippingAddress,
          orderitems,
          paymentMethod,
          isPaid,
          paidAt,
          isProcessing,
        },
        { new: true }
      );
      console.log(updateorder)
      if (updateorder) {
        
        return NextResponse.json({
          success: true,
          data: updateorder,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to update order",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Not authorized to update order",
      });
    }
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong, Please try again",
    });
  }
}
