import mongoose from "mongoose";

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

export const User=mongoose.model("User",userSchema);