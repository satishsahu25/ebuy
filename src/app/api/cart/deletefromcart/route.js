import Cart from "@/Models/cart";
import connecttoDB from "@/database";
import Authuser from "@/middlewares/Authuser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
 
  try {
    await connecttoDB();

    const isauthuser = await Authuser(req);
    if (isauthuser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id)
        return NextResponse.json({
          success: false,
          message: "Cart item is required",
        });

      const deletecart = await Cart.findByIdAndDelete(id);

      if (deletecart) {
        return NextResponse.json({
          success: true,
          message: "Cart item deleted successfully !",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to delete cart item!",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated !",
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
      message: "Something went wrong !",
    });
  }
}
