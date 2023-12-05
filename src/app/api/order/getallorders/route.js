import Order from "@/Models/order";
import connecttoDB from "@/database";
import Authuser from "@/middlewares/Authuser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connecttoDB();
    const isauthuser = await Authuser(req);

    if (isauthuser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      const extractallorders = await Order.find({ user: id }).populate(
        "orderitems.product"
      );

      if (extractallorders) {
        return NextResponse.json({
          success: true,
          data: extractallorders,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to get all orders",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated",
      });
    }
  } catch (err) {}
}
