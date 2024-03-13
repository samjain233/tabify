import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Group } from "../models/group.models.js";

const createGroup=asyncHandler(async (req,res)=>{
    // Fetch data from frontend/postman
    const {name,colour}=req.body;
    // Validation
    if(name.trim===""){
        throw new ApiError(400,"Name is Required")
    }
    const userGroupList=req.user.group_list
    const groupAlreadyExists=await Group.findOne({_id:{$in : userGroupList},name:name})

    if(groupAlreadyExists){
        throw new ApiError(400,"Group already exists")
    }

    const newGroup= await Group.create({
        name,
        colour
    })
    
    
    const newGroupCreated=await Group.findById(newGroup._id)
    
    if(!newGroupCreated){
        throw new ApiError(500,"Something went wrong while creating the group")
    }
    
    req.user.group_list.push(newGroup)
    await req.user.save()

    return res.status(201).json(
        new ApiResponse(200,newGroupCreated,"Group created successfully")
    )
})

const deleteGroup=asyncHandler(async (req,res)=>{
    const{id}=req.body;
    if(!id){
        throw new ApiError(400,"Select a Group to remove")
    }
    await Group.deleteOne(id)
    const checkGroupDeleted=await Group.findById(id)
    if(checkGroupDeleted){
        throw new ApiError(500,"Group could not be deleted")
    }

    const index = req.user.group_list.indexOf(id);
    if (index === -1) {
        throw new ApiError(404, "Group not found in user's group list");
    }

    // Remove the group ID from the array
    req.user.group_list.splice(index, 1);

    // Save the user model to persist the changes
    await req.user.save();

    return res.status(201).json(
        new ApiResponse(200,"Group Deleted Successfully")
    )
})

export{
    createGroup,
    deleteGroup
}