import Order from "@/Models/order";
import connecttoDB from "@/database";
import Authuser from "@/middlewares/Authuser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connecttoDB();

    const isauthuser=await Authuser(req);
    if(isauthuser?.role==='admin'){
        const getallorders=await Order.find({}).populate('orderitems.product').populate('user');

        if(getallorders){
            return NextResponse.json({
                success:true,
                data: getallorders
            })
        }else{
            return NextResponse.json({
                success:false,
                message:"failed to fetch all orders"
            })

        }

    }else{
        return NextResponse.json({
            success:false,
            message:"You are not authorized"
        })
    }





  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong, Please try again",
    });
  }
}
