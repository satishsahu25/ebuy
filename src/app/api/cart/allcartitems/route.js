import Cart from "@/Models/cart";
import connecttoDB from "@/database";
import Authuser from "@/middlewares/Authuser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";


export async function GET(req){

    try{

        await connecttoDB();
        const isauthuser=await Authuser(req);

        if(isauthuser){
         

            // const {searchParams}=new URL(req.url);
            // const id=searchParams.get("id");

            const id=isauthuser.id;
       
            if(!id) return NextResponse.json({
                success: false,
                message:"Please login in"
            });



        const extractAllCartItems=await Cart.find({userId:id}).populate('productId');
        
        console.log( extractAllCartItems);

        if(extractAllCartItems){
            return NextResponse.json({
                success: true,
                data:extractAllCartItems
              });
        }else{
            return NextResponse.json({
                success: false,
                message:"No items in cart"
              });

        }



        }else{
            return NextResponse.json({
                success: false,
                message: 'You are not authorized',
              });

        }

    }catch(err){
        return NextResponse.json({
            success: false,
            message: 'something went wrong',
          });

    }


}
