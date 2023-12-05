import Address from "@/Models/address";
import connecttoDB from "@/database";
import Authuser from "@/middlewares/Authuser";

import Joi from "joi";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const addnewaddress = Joi.object({
  fullname: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  postalcode: Joi.string().required(),
  userId: Joi.string().required(),
});

export async function POST(req) {
 
  try {
   
    await connecttoDB();
    
    const isauthuser = await Authuser(req);

    if (isauthuser) {
      const data = await req.json();
      const { fullname, address, city, country, postalcode, userId } = data;
      
      const { error } = addnewaddress.validate({
        fullname,
        address,
        city,
        country,
        postalcode,
        userId,
      });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

     

      const newlyaddedaddress = await Address.create(data);

      if (newlyaddedaddress) {
        return NextResponse.json({
          success: true,
          message: "Address added successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Address not added, failed",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated",
      });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
