import mongoose,{Schema} from "mongoose";

const PostSchema=new Schema(
    {
        quote:{
            type:String,
            required:[true,"Quote required"]
        },
        catagory:{
            type:String,
            required:[true,"Catagory required"]
        },
        BgImageUrl:{
            type:String,
        },
        BgColor:{
            type:String,
        },
        TextColor:{
            type:String
        },
        Owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {timestamps:true});

export const Quote=mongoose.models.quotes || mongoose.model("quotes",PostSchema);