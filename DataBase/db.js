import env from "dotenv";
env.config();

import mongoose from "mongoose";

mongoose.set('strictQuery', false);
//Set up default mongoose connection

const DB = "mongodb+srv://kartikhatwar98:9371865060k@cluster0.wmbj5tq.mongodb.net/?retryWrites=true&w=majority"

export const connectDB = async ()=>{

    try {
        await mongoose.connect(DB,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
          });
    
        console.log("connected");  
    } catch (err) {
        console.log(err);
    }
    
    
}

const userSchema = new mongoose.Schema({
    GoogleId : String,
    Name : String,
    ProfilePhoto : String,
    RefreshToken : {
        type : String,
    },
    AccessToken : {
        type : String,
    },
    LastVisited: { type: Date, default: new Date() }
});

export const User = mongoose.model("user", userSchema);