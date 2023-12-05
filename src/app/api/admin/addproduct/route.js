import product from "@/Models/product";
import connecttoDB from "@/database";
import Authuser from "@/middlewares/Authuser";
import Joi from "joi";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const AddnewproductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
  sizes: Joi.array().required(),
  deliveryInfo: Joi.string().required(),
  onSale: Joi.string().required(),
  priceDrop: Joi.number().required(),
  imageUrl: Joi.string().required(),
});

export async function POST(req) {
  try {
    await connecttoDB();

    //check autheticated user and also admin user
   

    const isauthuser=await Authuser(req);

    if (isauthuser?.role === "admin") {
      const extractdata = await req.json();
      const {
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

      const { error } = AddnewproductSchema.validate({
        name,
        description,
        price,
        imageUrl,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
      });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newlycreatedproduct = await product.create(extractdata);

      if (newlycreatedproduct) {
        return NextResponse.json({
          success: true,
          message: "Product added successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Product failed to add",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized",
      });
    }
  } catch (err) {
    
    return NextResponse.json({
      success: false,
      message: "Something went wrong, Please try again later",
    });
  }
}
