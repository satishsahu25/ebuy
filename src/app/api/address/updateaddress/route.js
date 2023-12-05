import Address from "@/Models/address";
import connecttoDB from "@/database";
import Authuser from "@/middlewares/Authuser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";


export async function PUT(req) {
  try {
    await connecttoDB();

    const data = await req.json();

    const isauthuser = await Authuser(req);

    if (isauthuser) {
      const { _id, fullname, address, city, country, postalcode } = data;
    
      const updateaddress=await Address.findOneAndUpdate({
        _id:_id
      },{
        fullname, address, city, country, postalcode
      },{new:true});


      if(updateaddress){
        return NextResponse.json({
          success: true,
          message: "Address updated successfully",
        });

      }else{
        return NextResponse.json({
          success: false,
          message: "Failed to update address",
        });
      }
   
   
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated ",
      });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
