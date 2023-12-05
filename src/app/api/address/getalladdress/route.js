import Address from "@/Models/address";
import connecttoDB from "@/database";
import Authuser from "@/middlewares/Authuser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connecttoDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    console.log(id);

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Id is required",
      });
    }

    const isauthuser = await Authuser(req);
    if (isauthuser) {
      const getalladdress = await Address.find({ userId: id });

      if (getalladdress) {
        return NextResponse.json({
          success: true,
         data: getalladdress,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to get addresses",
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
