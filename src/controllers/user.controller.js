import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

const CookieOptions ={
    httpOnly:true,
    secure:true
}

const generateAccessAndRefreshToken = async (userId)=>{
    const user = await User.findById(userId)
    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()

    

    user.refreshToken = refreshToken
    await user.save({validateBeforeSave:false})

    return {accessToken,refreshToken}

}


const registerUser = asyncHandler(async (req,res) => {
    
    const { name, email, password} = req.body;

    // checking whether we got the data  or not

    if (!name || !email || !password) {
        throw new ApiError(400,"Please provide all the required fields")
    }

    //check wheter the user exists or not

    const ExistedUser = await User.findOne({email});

    if (ExistedUser) {
        throw new ApiError(409, "Email already in use")
    }

    //create a user and save it to the database

    const user = await User.create({
        name, email, password
    })

    const createdUser =await User.findById(user._id).select("-password -refreshToken")

        if (!createdUser) {
            throw new ApiError(500,"Error occureced while creating a user")
            
        }



     return res.status(200).json(new ApiResponse(200,createdUser,"User created successfully"))

})

const loginUser = asyncHandler(async (req,res) => {

    const { email, password} = req.body;

    if (!email || !password) {
            throw new ApiError(400,"Please provide all the required fields")
    }

    //check wheter the user exists or not

    const ExistedUser = await User.findOne({email});

    if (!ExistedUser) {
        throw new ApiError(404, "Email does not exist")
    }

    const isPasswordCorrect = await ExistedUser.isPasswordCorrect(password)

    if (!isPasswordCorrect) {
         throw new ApiError(401, "password is Invalid")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(ExistedUser._id)

    const loggedinUser = await User.findById(ExistedUser._id).select("-password -refreshToken")

        

    return res.status(200)
    .cookie("accessToken", accessToken,CookieOptions)
    .cookie("refreshToken", refreshToken,CookieOptions)
    .json(new ApiResponse(200,{loggedinUser,accessToken,refreshToken},"Login Successful"))
})

const logoutUser =  asyncHandler(async (req,res) => {
    
    await User.findByIdAndUpdate(req.user._id,
        {
            $set:{
                refreshToken:undefined,
            }
         },
        {new:true})

        return res.status(200)
        .clearCookie("accessToken",CookieOptions)
        .clearCookie("refreshToken",CookieOptions)
        .json(new ApiResponse(200,"Logout Successful"))

})

const getCurrentUser = asyncHandler(async (req,res) => {

    return res.status(200)
    .json(new ApiResponse(200,{user:req.user},"Current User Fetched Successfully"))

})

const refreshAccessToken = asyncHandler(async (req,res) => {
    
    const incomingRefreshToken = req.cookies?.refreshToken || req.header("Authorization").replace("Bearer ","")
    
    if (!incomingRefreshToken) {throw new ApiError(401,"Unauthorized - No Refresh Token Found In Request")}

    try {
        
        const decodedToken =  jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }

        if (incomingRefreshToken != user?.refreshToken) {
            throw new ApiError(401, "Refresh Token Expired")
        }

        const {accessToken,refreshToken}= generateAccessAndRefreshToken(user._id)

        return res.status(200)
       .cookie("accessToken", accessToken, CookieOptions)
       .cookie("refreshToken", refreshToken, CookieOptions)
       .json(new ApiResponse(200,{"accessToken":accessToken, "refreshToken":refreshToken},"Access Token Refreshed successfully"))

    } catch (error) {
        throw new ApiError(401,"Unauthorized - Access Token Refresh Failed")
    }

})

const updateUserAccount = asyncHandler(async (req,res) => {

 const { name, email} = req.body
 
 if (!name &&!email) {
        throw new ApiError(400,"Please provide at least one field to update")
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{name,email}
        },
        {new:true}
    ).select("-password -refreshToken")


    return res.status(200)
    .json(new ApiResponse(200,user,"Account Updated Successfully"))
    
})

const changeUserPassword = asyncHandler(async (req,res) => {
    const {oldPassword,newPassword} = req.body

    if (!oldPassword || !newPassword) {
        throw new ApiError(401,"Please provide all the required fields to change password")
    }

    const user = await User.findById(req.user._id);

    const isPasswordCorrect = await  user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(401,"Password is Invalid")
    }

    user.password = newPassword
    user.save()



    return res.status(200)
    .json(new ApiResponse(200,"Password Changed Successfully"))
    
}) 


export { 
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    refreshAccessToken,
    updateUserAccount,
    changeUserPassword
 
}