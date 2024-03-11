import mongoose from "mongoose";

const groupItemSchema=new mongoose.Schema({
    name: { 
        type: String, 
        required:true,
        lowercase:true,
    },
    colour:{
        type: Colour,
        default: 0,
    },
},{});

const groupsSchema=new mongoose.Schema({
    items:{
        type: [groupItemSchema] ,
        required:true,
        default:null,
    },
    ownedby:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},{timestamps:true});

export const Group=mongoose.model("Group",groupsSchema);