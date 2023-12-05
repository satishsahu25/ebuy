import product from "@/Models/product";
import connecttoDB from "@/database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req){

    try{

        await connecttoDB();

        const {searchParams}=new URL(req.url);
        const id=searchParams.get('id');
        const getdata=await product.find({category:id});

        if(getdata){
            return NextResponse.json({
                success: true,
                data:getdata,
              });
        }else{
            return NextResponse.json({
                success: false,
                message: "No product found",
              });
        }

    }catch(err){
        return NextResponse.json({
            success: false,
            message: "Something went wrong",
          });
    }
}