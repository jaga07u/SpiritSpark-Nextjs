import mongoose,{Schema} from "mongoose";

 const likeSchema=new Schema(
    {
       quoteId:{
        type:Schema.Types.ObjectId,
        ref:"Quote"
       },
       LikedBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
       }
    },
    
    {timestamps:true});

export const Like=mongoose.models.likes || mongoose.model("likes",likeSchema);
