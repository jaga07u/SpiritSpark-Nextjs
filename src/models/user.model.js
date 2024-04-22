import mongoose,{Schema} from "mongoose";

const UserSchema=new Schema(
    {
        username:{
            type:String,
            required:[true,"username requird"]
        },
        fullname:{
            type:String,
            required:[true,"fullname requird"]
        },
        email:{
            type:String,
            required:[true,"email requird"]
        },
        password:{
            type:String,
            required:[true,"password requird"]
        },
        savedQuote:[
            
            {
            type:Schema.Types.ObjectId,
            ref:"Quote"
        }
        ]
        ,
        avatarImg:{
            type:String,
        },
        coverImg:{
            type:String
        },
        Token:{
            type:String
        },
        isVerify:{
            type:Boolean,
            default:true
        },
        forgotpasswordToken:{
            type:String
        }

    },
    {timestamps:true}
    );
export const User=mongoose.models.users || mongoose.model("users",UserSchema);