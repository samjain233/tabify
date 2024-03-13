import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Tab } from "../models/tab.models.js";

const addTab=asyncHandler(async (req,res)=>{
    const{name,favicon,url,groupId}=req.body()
    if (
        [name,url].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Name or Url not found")
    }
    // const existedTab= await Tab.findOne({
    //     $or:[{url}]
    // })

    const tab=await Tab.create({
        name,
        favicon,
        url
    })

    const tabCreated=await Tab.findById(tab._id)

    if(!tabCreated){
        throw new ApiError(500,"Something went wrong while adding tab to group")
    }

    const findGroup=req.user.group_list.findById(groupId)

    if(!findGroup){
        throw new ApiError(500,"Group not found")
    }

    req.user.group_list.findById(groupId).tabs.push(tab)
    await req.user.group_list.findById(groupId).save()

    return res.status(201).json(
        new ApiResponse(200,"Tab added to Group")
    )

})

const removeTab=asyncHandler(async (req,res)=>{
    const{id,tabId}=req.body

    if (
        [id,tabId].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Details not recieved")
    }

    await Tab.deleteOne(tabId)
    const checkTabDeleted=await Tab.findById(tabId)
    if(checkTabDeleted){
        throw new ApiError(500,"Tab could not be removed")
    }

    const index=req.user.group_list[id].indexOf(tabId)
    if(index===-1){
        throw new ApiError(404,"Tab is not present in the Group")
    }
    req.user.group_list[id].splice(index,1)
    await req.user.group_list[id].save()

    return res.status(201).json(
        new ApiResponse(200,"Tab Deleted Successfully")
    )
})

export {
    addTab,
    removeTab
}