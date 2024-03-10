import mongoose from "mongoose";

const groupSchema=new mongoose.Schema({
    name: { 
        type: String, 
        required:true,
        lowercase:true,
    },
    colour:{
        type: Colour,
        default: 0,
    },
},{timestamps:true});

export const group=mongoose.model("group",groupSchema);