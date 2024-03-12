import mongoose from "mongoose";

const groupItemSchema=new mongoose.Schema({
    name: { 
        type: String, 
        required:true,
        lowercase:true,
    },

    group_id:{
        type: Number,
        required:true,
        unique:true,
    },

    colour:{
        type: String,
        default: "#000000",
    },
},{});

// const groupsSchema=new mongoose.Schema({
//     items:{
//         type: [groupItemSchema] ,
//         required:true,
//         default:null,
//     },
//     ownedby:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//     }
// },{timestamps:true});

export const Group=mongoose.model("Group",groupItemSchema);