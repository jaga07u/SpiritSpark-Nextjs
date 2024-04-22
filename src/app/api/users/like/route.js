import { connect } from "@/dbConfig/dbConnect";
import { Like } from "@/models/like.model";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

connect();
export async function POST(request) {
    try {
        const reqbody = await request.json();
        // console.log(reqbody);
        const { quoteId} = reqbody;
        console.log(quoteId);

        const token = cookies().get("Token");
  const decodeUser = jwt.verify(token?.value, process.env.TOKEN_SECRET);
  const CurrentUserId = decodeUser._id;
        // const userId = LikedBy;
        const conditions = { quoteId: quoteId, LikedBy: CurrentUserId};
        const existingLike = await Like.findOne(conditions);
        
        if (!existingLike) {
            const newLike = await Like.create({ quoteId: quoteId, LikedBy: CurrentUserId });
            return NextResponse.json( {
                status: 200,
                body: {
                    newLike,
                    message: "Like created successfully"
                }
            });
        } else {
            const removedLike = await Like.findOneAndDelete(conditions);
            return NextResponse.json( {
                status: 200,
                body: {
                    removedLike,
                    message: "Like deleted successfully"
                }
            });
        }
    } catch (error) {
        // Handle any errors
        console.error("Error:", error);
        return NextResponse.json( {
            status: 500,
            body: {
                message: "Internal server error"
            }
        });
    }
}
