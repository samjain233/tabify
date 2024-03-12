import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/users.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const registerUser=asyncHandler(async (req,res)=>{
    // Getting details from postman/frontend
    const{username,email,password}=req.body
    
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
        $or: [{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User with email already exists")
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

const loginUser = asyncHandler(async (req, res) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const {email, password} = req.body
    console.log(email);

    if (!email) {
        throw new ApiError(400, "Email is required")
    }

    const user = await User.findOne({
        $or: [{email}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

   const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

const logoutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        }
    )
    const options={
        httpOnly:true,
        secure:true
    }

    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged Out"))
})

export {
    registerUser,
    loginUser,
    logoutUser
}
