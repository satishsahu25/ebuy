import mongoose  from "mongoose";

const userschema=new mongoose.Schema({

    name:String,
    email:String,
    password:String,
    role:String,
    
});

const User=mongoose.models.User || mongoose.model('User',userschema);
export default User;