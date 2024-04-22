import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import { Quote } from "@/models/post.model";
import { User } from "@/models/user.model";
import mongoose from "mongoose";

export async function GET(request,{params}){
   const {id}=params;
   const token =cookies().get("Token");
  //console.log(token.value);
  const decodeUser=jwt.verify(token.value,process.env.TOKEN_SECRET);
  const UserId=decodeUser._id; // Replace with the actual user ID
  //console.log(UserId );

   const quotes = await Quote.aggregate([
    // Match stage to filter quotes by owner ID
    {
      $match: {
        Owner: new mongoose.Types.ObjectId(id)
      }
    },
    // Lookup stage to get likes for each quote
    {
      $lookup: {
        from: "likes",
        let: { quoteId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$quoteId", "$$quoteId"] },
              LikedBy: new mongoose.Types.ObjectId(UserId) // Filter likes by current user
            }
          }
        ],
        as: "userLikes" // Store user's likes in a separate field
      }
    },
    // Add field to calculate number of likes for each quote
    {
      $addFields: {
        likeCount: { $size: "$userLikes" }, // Total likes
        isLikedByCurrentUser: { $cond: { if: { $gt: [{ $size: "$userLikes" }, 0] }, then: true, else: false } } // Check if current user has liked the post
      }
    },
    // Project stage to shape the output
    {
      $project: {
        Owner:1,
        quote: 1, // Keep the quote ID,
        BgImageUrl: 1,
        BgColor: 1,
        TextColor: 1,
        likeCount: 1, // Number of likes for each quote
        isLikedByCurrentUser: 1 // Field indicating if the current user has liked the post
      }
    }
  ]);
  const userInfo = await User.aggregate([
    // Match stage to filter users by user ID
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id) // Convert userId to ObjectId
      }
    },
    // Lookup stage to get follower count
    {
      $lookup: {
        from: "followers",
        localField: "_id",
        foreignField: "account",
        as: "Followers"
      }
    },
    {
      $lookup: {
        from: "followers",
        localField: "_id",
        foreignField: "followedTo",
        as: "following"
      }
    },
    // Count the number of followers
    {
      $addFields: {
        followerCount: { $size: "$Followers" },
        followingCount: { $size: "$following" },
        followedToIds: "$Followers.followedTo" // Extract followedTo IDs from Followers array
      }
    },
    // Project stage to shape the output
    {
      $project: {
        _id: 1, // Exclude user ID from the output
        username: 1,
        fullname: 1,
        avatarImg: 1,
        followerCount: 1, // Number of followers
        followingCount: 1, // Number of followings
        isFollwed:{$in:[new mongoose.Types.ObjectId(UserId),"$followedToIds"]
      }
      }
    }
  ]);
//   console.log(userInfo);
//   for (let index = 0; index <userInfo.isFollwed.length; index++) {
//     console.log(userInfo.isFollwed[i]);
    
//   }
  

// The `userInfo` will now contain an additional field `isCurrentUserFollowing` indicating whether the logged-in user is following the queried user.


    return NextResponse.json({
        user:userInfo,
        quote:quotes,
        message:"User Profile ready"
    })
}