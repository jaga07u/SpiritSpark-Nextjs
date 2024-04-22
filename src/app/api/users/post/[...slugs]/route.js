import { connect } from "@/dbConfig/dbConnect";
import { Quote } from "@/models/post.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { User } from "@/models/user.model";

connect();

export async function GET(request, { params }) {
    try {
        const token = cookies().get("Token");
        const decodeUser = jwt.verify(token?.value, process.env.TOKEN_SECRET);
        const userId = new mongoose.Types.ObjectId(decodeUser._id);

        const limit = Number(params.slugs[0]);
        const page = Number(params.slugs[1]);
        const skip = (page - 1) * limit;
        console.log(skip);

        const quotes = await Quote.aggregate([
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "quoteId",
                    as: "Likes"
                }
            },
            {
                $addFields: {
                    likeCount: { $size: "$Likes" },
                    isLiked: {
                        $cond: {
                            if: { $in: [userId, "$Likes.LikedBy"] },
                            then: true,
                            else: false
                        }
                    }
                }
            },
            {
                $lookup: {
                  from: "followers",
                  localField: "Owner",
                  foreignField: "account",
                  as: "followers"
                }
              },
              {
                $lookup: {
                  from: "followers",
                  localField: "Owner",
                  foreignField: "followedTo",
                  as: "following"
                }
              },
              // Count the number of followers
              {
                $addFields: {
                  followerCount: { $size: "$followers" },
                  followingCount: { $size: "$following" }
                }
              },
            {
                $lookup: {
                    from: "users",
                    localField: "Owner",
                    foreignField: "_id",
                    as: "owner"
                }
            },
           
            {
                $unwind: "$owner"
            },
            {
                $lookup: {
                    from: "followers",
                    let: { ownerId: "$owner._id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$account", "$$ownerId"] },
                                        { $eq: ["$followedTo", userId] } // Check if the current user has followed this account
                                    ]
                                }
                            }
                        }
                    ],
                    as: "followed"
                }
            },
            {
                $addFields: {
                    isFollowed: { $cond: { if: { $gt: [{ $size: "$followed" }, 0] }, then: true, else: false } }
                }
            },
            {
                $sort: { createdAt: -1 } // Sort by creation date in descending order
              },
            {
                $project: {
                    _id: 1,
                    quote: 1,
                    category: 1,
                    BgImageUrl: 1,
                    BgColor: 1,
                    TextColor: 1,
                    Owner: {
                        _id: "$owner._id",
                        username: "$owner.username",
                        avatar: "$owner.avatarImg"
                    },
                    createdAt: 1,
                    likeCount: 1,
                    followerCount:1,
                    followingCount:1,
                    isLiked: 1,
                    isFollowed: 1 // Add the isFollowed field
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            }
        ]);
        


      //  console.log( userFollowed);

        return NextResponse.json({
            status: 200,
            data: quotes,
            success: true
        });
    } catch (error) {
        console.error("Error fetching quotes:", error);
        return NextResponse.error("Internal Server Error", { status: 500 });
    }
}
