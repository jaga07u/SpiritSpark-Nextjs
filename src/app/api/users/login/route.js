import { User } from "@/models/user.model";
import { connect } from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { uploadOnCloudinary } from "@/helper/CloudinaryEnv";
import {writeFile} from "fs/promises"
import { ImageKitUpload } from "@/helper/ImageKitUploader";


connect();
const generateAccessAndRefresToken=async(id)=>{

   const user=await User.findById(id);
  // console.log(user);
     const Token=jwt.sign(
      {
         _id:user?._id,
         username:user?.username,
         email:user?.email
      },process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_SECRET_EXPIRY }
   )
   // console.log(AccessToken);
   // console.log(refreshToken);
return {Token};
}
export async function POST(request){
     const reqbody=await request.json();
    // console.log(reqbody);
     const {email,password}=reqbody;
     const user=await User.findOne({email:email});
     //console.log(user);
     if(!user){
        return NextResponse.json({
            message:"email does not exist"
        })
     }
     const IspasswordCorrect=await bcrypt.compare(password,user.password);
     console.log(IspasswordCorrect);
     if(!IspasswordCorrect){
        throw new Error("Invalid password")
     }
     const {Token}=await generateAccessAndRefresToken(user._id);
     user.Token=Token;
    await  user.save({validateBeforeSave:false})
     cookies().set("Token",Token,{secure:true});
     return NextResponse.json({
        data:user,
        message:"User find Successfull",
        success:true,
     })
}

export async function GET(request){
const token =cookies().get("Token");
//console.log(token.value);
const decodeUser=jwt.verify(token.value,process.env.TOKEN_SECRET);
const UserId=decodeUser._id;
const user=await User.findById(UserId);
if(!user){
   throw new Error("Please Loggin first");
}
return NextResponse.json({
   status:200,
   data:user,
   message:"ok"
})
}
export async function PATCH(request){
   const reqBody=await request.formData();
  // console.log(reqBody);
  const userID=reqBody.get("ID");
   const username=reqBody.get("username");
   const fullname=reqBody.get("fullname");
   const file = reqBody.get('file');
   let AvtarImage="";
if (file) {
  try {
    // Upload the file
    const uploadResult = await ImageKitUpload(file);
    // If upload is successful, set quotebgImage
    AvtarImage = uploadResult.url;
    // If upload is successful, set quotebgImage
  } catch (error) {
    console.error(error);
    // Handle error
  }
}
console.log(AvtarImage);
  const newData={username,fullname,avatarImg:AvtarImage}
   const UpdateUser=await User.findByIdAndUpdate(
      userID,
      newData,{
         new:true
      }
   )
   return NextResponse.json({
      UpdateUser,
      message:"User Update ready"
   })
}

export async function DELETE(){
   cookies().set("Token","",{secure:true});
 return NextResponse.json({
   message:"User loggedout Successfully"
 })


}