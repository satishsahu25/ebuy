import product from "@/Models/product";
import connecttoDB from "@/database";
import { NextResponse } from "next/server";

export const dynamic='force-dynamic';



export async function GET(req){


    try{
        await connecttoDB();

        const {searchParams}=new URL(req.url);
        const prodid=searchParams.get('id');


        if(!prodid){
         return NextResponse.json({
                success:false,
                status:400,
                message: "product id not found"
            });
        }


        const getdata=await product.find({_id:prodid});

        if(getdata && getdata.length){
            return NextResponse.json({
                success:true,
                data:getdata[0]
            });
        }else{
            return NextResponse.json({
                success:false,
                message:"product not found"
            });

        }

    }catch(err){
        return NextResponse.json({
            success:false,
            message: "something went wrong"
        });

    }

}