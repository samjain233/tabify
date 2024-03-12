import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/users.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser=asyncHandler(async (req,res)=>{
    // Getting details from postman/frontend
    const{username,email,password}=req.body
    console.log("email:", email)
    console.log("username:",username)
    console.log("password:",password)
    // Validation
    if (
        [username,email,password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    if (password.length < 8) {
        throw new ApiError(400, "The Password must be at least 8 characters long");
    }

    // Check if already exists
    const existedUser=await User.findOne({
        $or: [{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
    }
    // Create user object and create entry
    const user= await User.create({
        username,
        email,
        password
    })
    const usercreated=await User.findById(user._id).select(
        "-password"
    )
    // remove password and token from response
    // Check for user creation
    if(!usercreated){
        throw new ApiError(500,"Something went wrong while registering the user")
    }
    // return response
    return res.status(201).json(
        new ApiResponse(200,usercreated,"User Created Successfully")
    )
})

export {registerUser}