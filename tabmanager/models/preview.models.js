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
        type: mongoose.Schema.Types.ObjectId,
        ref:"group",
        required:true,
        default:null,
    },

},{timestamps:true});

export const preview=mongoose.model("preview",previewSchema);