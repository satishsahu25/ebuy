import product from "@/Models/product";
import connecttoDB from "@/database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  await connecttoDB();

  try {
    const extractallproducts = await product.find({});

  

    if (extractallproducts) {
      return NextResponse.json({
        success: true,
        data: extractallproducts,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No products found",
      });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Some error occured",
    });
  }
}
