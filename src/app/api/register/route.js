import User from "@/Models/user";
import connecttoDB from "@/database";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connecttoDB();

  const { name, email, password, role } = await req.json();

  //validate the schema
  const { err } = schema.validate({ name, email, password, role });

  if (err) {
    return NextResponse.json({
      success: false,
      message: err.details[0].message,
    });
  }

  try {
    const isuseralreadyexit = await User.findOne({ email: email });

    if (isuseralreadyexit) {
      return NextResponse.json({
        success: false,
        message: "User already exist",
      });
    } else {
      //Hash the password

      const hashpass = await hash(password, 12);
      const newuser = await User.create({
        name,
        email,
        password: hashpass,
        role,
      });

      if (newuser) {
        return NextResponse.json({
          success: true,
          message: "Account created successfully",
        });
      }
    }
  } catch (err) {
    console.log("Error in registration");
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Try again later",
    });
  }
}
