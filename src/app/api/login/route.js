import User from "@/Models/user";
import connecttoDB from "@/database";
import Joi from "joi";
import { NextResponse } from "next/server";
import Jwt from 'jsonwebtoken'
import { compare } from "bcryptjs";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connecttoDB();

  const { email, password } = await req.json();

  //validate the schema
  const { err } = schema.validate({ email, password });

  if (err) {
    return NextResponse.json({
      success: false,
      message: err.details[0].message,
    });
  }

  try {
    
    const isuseralreadyexit = await User.findOne({ email: email });

    if (!isuseralreadyexit) {
      return NextResponse.json({
        success: false,
        message: "User does not exist",
      });
    }
    // console.log(isuseralreadyexit);

    const checkpas = await compare(password, isuseralreadyexit.password);
 
    if (!checkpas) {
      return NextResponse.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = Jwt.sign(
      {
        id: isuseralreadyexit._id,
        email: isuseralreadyexit.email,
        role: isuseralreadyexit.role,
      },
      "default-secret-key",
      { expiresIn: "1d" }
    );
    const finaldata = {
      token,
      user: {
        email: isuseralreadyexit.email,
        name: isuseralreadyexit.name,
        _id: isuseralreadyexit._id,
        role: isuseralreadyexit.role,
      },
    };

    return NextResponse.json({
      success: true,
      finaldata: finaldata,
      message: "logged in successfully",
    });
  } catch (err) {
    console.log("Error in login");
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Try again later",
    });
  }
}
