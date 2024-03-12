import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:true,
        lowercase:true,
    },

    email:{
        type: String,
        required:true,
        unique:true,
        lowercase:true,
    },

    password:{
        type: String,
        required:true,
    },

    // Array of Group Objects->Check for Default
    group_list:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Group', 
    }],

    // Array of Tab Objects->Check for Default
    tab_list:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Preview',
    }]

},{timestamps:true});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password=bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods,generateAccessToken=async function(){
    jwt.sign(
        {
        _id: this._id,
        email: this.email,
        username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}
userSchema.methods,generateRefreshToken=async function(){
    jwt.sign(
        {
        _id: this._id,
        },
        process.env.REFESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

export const User=mongoose.model("User",userSchema);