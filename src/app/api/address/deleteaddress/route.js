import Address from "@/Models/address";
import connecttoDB from "@/database";
import Authuser from "@/middlewares/Authuser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connecttoDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Address Id is required",
      });
    }

    const isauthuser = await Authuser(req);
    if (isauthuser) {
      const deletedaddress = await Address.findByIdAndDelete(id);
      if (deletedaddress) {
        return NextResponse.json({
          success: true,
          message: "Address is deleted successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to delete address",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
