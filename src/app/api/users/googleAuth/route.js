import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { connect } from "@/dbConfig/dbConnect";
import { User } from "@/models/user.model";
import bcrypt from "bcrypt"

connect();
export async function POST(request){
    const reqbody=await request.json();
    const {username,email,fullname,avatarImg,isVerify,password}=reqbody
    const hashPass=await bcrypt.hash(password,10);
    console.log(hashPass);
    const user=await User.create({
        username,
        email,
        fullname,
        avatarImg:avatarImg || "",
        isVerify:isVerify || false,
        password:""
    })
  if(!user){
    return NextResponse.json({
        message:"User created failed "
    })
  }
    //const {}=reqbodyl
    
   // cookiesStor.set("Token",)
    return NextResponse.json({
        user:user,
        message:"user Created"
    })
}