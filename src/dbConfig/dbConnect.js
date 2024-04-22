import mongoose from "mongoose";


export async function connect(){
    try {
        const dbconnect=await mongoose.connect("mongodb+srv://Jaga_2004:6N6YrahBwdpqJD7g@cluster0.bfa9ivv.mongodb.net/");
        console.log("db connected successfully");
        // const connection=mongoose.connection;
        // connection.on('connected',()=>{
        //     console.log('MongoDB connected successfully');
            
        // })
        // connection.on('error',(error)=>{
        //     console.log('MongoDB connection error .please make sure MongoDB is running'+error);
        //     process.exit();
        // })S

    } catch (error) {
        console.log("Something goes wrong");
        console.log(error);
        
        
    }
}