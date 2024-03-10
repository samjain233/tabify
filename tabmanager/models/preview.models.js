import mongoose from "mongoose";

const previewSchema=new mongoose.Schema({

    id:{
        type: Number,
        unique:true,
        required:true,
    },

    name:{
        type: String,
        required:true,
        unique:true    
    },

    group:{
        type: String,
        lowercase:true,
    },

},{timestamps:true});

export const preview=mongoose.model("preview",previewSchema);