import Cart from "@/Models/cart";
import connecttoDB from "@/database";
import Authuser from "@/middlewares/Authuser";
import Joi from "joi";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const AddtoCart = Joi.object({
  userId: Joi.string().required(),
  productId: Joi.string().required(),
});

export async function POST(req) {
 
  try {
    await connecttoDB();
    const isauthuser = await Authuser(req);

    if (isauthuser) {
      const data = await req.json();
 
      const { userId,productId } = data;
  
      const { error } = AddtoCart.validate({userId,productId });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const iscurrentcartitemalreadyexist = await Cart.find({
        userId:userId,productId:productId
      });

      if (iscurrentcartitemalreadyexist?.length>0) {
        return NextResponse.json({
          success: false,
          message:
            "Product is already added in cart, please add different product",
        });
      }

      const saveproductToCart = await Cart.create(data);

      if (saveproductToCart) {
        return NextResponse.json({
          success: true,
          message: "Product added successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to add product to cart",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated !",
      });
    }
  } catch (err) {

    return NextResponse.json({
      success: false,
      message: "Something went wrong !",
    });
  }
}
