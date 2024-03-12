import mongoose from "mongoose";

const previewSchema=new mongoose.Schema({
    // For Priority of Tabs
    id:{
        type: Number,
        unique:true,
        required:true,
    },

    url:{
        type: String,
        required:true,    
    },

    // group:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:"group",
    //     required:true,
    //     default:null,
    // },

    group_id:{
        type: Number,
        required:false,
    }

},{timestamps:true});

export const Preview=mongoose.model("Preview",previewSchema);