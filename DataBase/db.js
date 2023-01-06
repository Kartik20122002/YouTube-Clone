// import env from "dotenv";
// env.config();

// import mongoose from "mongoose";
// import findOrCreatePlugin from 'mongoose-findorcreate';

// mongoose.plugin(findOrCreatePlugin);

// mongoose.set('strictQuery', false);
// //Set up default mongoose connection

// export const DB = "mongodb+srv://kartikhatwar98:9371865060k@youtube-lite.rcj46s0.mongodb.net/YouTube-Lite?retryWrites=true&w=majority";

// export const connectDB = ()=>{
//     mongoose.connect(DB,{
//         useUnifiedTopology: true,
//         useNewUrlParser: true,
//       }).then(()=>{
//         console.log('connected');
//     }).catch((err)=>{
//         console.log('Not connected :',err);
//     });
// }

// const userSchema = new mongoose.Schema({
//     id : {
//         type : String ,
//         default : null
//     },
//     email : {
//         type : String ,
//         required : [true , 'Email Required'],
//         unique : [true,'Email Already Registered']
//     },
//     firstName : String,
//     lastName : String,
//     profilePhoto : String,
//     password : {
//         type : String,
//     },
//     source: { type: String, required: [true, "source not specified"] },
//     lastVisited: { type: Date, default: new Date() }
// });

// const channelSchema = new mongoose.Schema({
//     channelId :{
//         type : String,
//         required : [true , 'Channel already added']
//     },
//     name : String,
//     thumbnail : String
// })

// export const User = mongoose.model("user", userSchema);
// export const Channel = mongoose.model("channel",channelSchema);