import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConnect";
import { User } from "@/models/user.model";
import bcrypt from "bcrypt";
import { Follower } from "@/models/follower.model";
import { cookies } from "next/headers";
connect();

export async function POST(request, { params }) {
  const { id } = params;
  const token = cookies().get("Token");
  const decodeUser = jwt.verify(token?.value, process.env.TOKEN_SECRET);
  const CurrentUserId = decodeUser._id;
  // console.log(id);
  // console.log(CurrentUserId);

  try {
    // Check if the user is already following the account
    const conditions ={
      followedTo: CurrentUserId,
      account: id,
    };
    const existingFollower= await Follower.findOne(conditions);
    if (existingFollower) {
      // If the user is already following, remove the follower relationship
      await Follower.findByIdAndDelete(existingFollower) ;
      return NextResponse.json({
        message: "Unfollowed successfully",
      });
    } else {
      // If the user is not following, add the follower relationship
      const newFollower = await Follower.create({
        followedTo: CurrentUserId,
        account: id,
      });
      return NextResponse.json({
        follower: newFollower,
        message: "Followed successfully",
      });
    }
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
}
