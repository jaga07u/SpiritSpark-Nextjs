import mongoose,{Schema} from "mongoose";

const FollowerSchema=new Schema(
    {
        followedTo:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        account:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        
    }
,
{timestamps:true});
export const Follower=mongoose.models.followers || mongoose.model("followers",FollowerSchema);