import product from "@/Models/product";
import connecttoDB from "@/database";
import Authuser from "@/middlewares/Authuser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connecttoDB();

    const isauthuser = await Authuser(req);
    if (isauthuser?.role === "admin") {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id) {
        return NextResponse.json({
          success: false,
          message: "product id is required",
        });
      }

      const deletedproduct = await product.findByIdAndDelete(id);

      if (deletedproduct) {
        return NextResponse.json({
          success: true,
          message: "product deleted usccessfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to delete product",
        });
      }
    }else{

      return NextResponse.json({
        success: false,
        message: "You are not authenticated",
      });

    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
      message: "Some error occurred while deleting",
    });
  }
}
