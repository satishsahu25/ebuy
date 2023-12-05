import product from "@/Models/product";
import connecttoDB from "@/database";
import Authuser from "@/middlewares/Authuser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connecttoDB();

    const isauthuser = await Authuser(req);
    if (isauthuser?.role === "admin") {
      const extractdata = await req.json();
      const {
        _id,
        name,
        description,
        price,
        imageUrl,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
      } = extractdata;

      const updatedproduct = await product.findOneAndUpdate(
        {
          _id: _id,
        },
        {
          name,
          description,
          price,
          imageUrl,
          category,
          sizes,
          deliveryInfo,
          onSale,
          priceDrop,
        },
        { new: true }
      );

      if (updatedproduct) {
        return NextResponse.json({
          success: true,
          message: "Product updated successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to update product",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated",
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
      message: "Unbale to fetch all products",
    });
  }
}
