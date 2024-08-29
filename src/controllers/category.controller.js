import mongoose from "mongoose";
import { Category } from "../models/category.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



const createCategory = asyncHandler(async (req,res) => {
    const {name,description} = req.body

    if (!name) {
        throw new ApiError(400,"Please provide a name for the category")
    }
    const user = await User.findById(req.user._id).select("-password -refreshToken")

    if (!user) {
        throw new ApiError(401,"User not found")
    }

    const createdCategory = await Category.create({name,description,ownerId:user._id})

    console.log(createdCategory);
    

    if (!createdCategory) {
        throw new ApiError(500,"Failed to create category")
    }

    return res.status(200).json(new ApiResponse(200,createdCategory,"Category created successfully"))

})  

const getCategories = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id)

    if (!user) {
        throw new ApiError(401,"User not found")
    }

    const  categories = await Category.find({ownerId:user._id})
    

    if (categories?.length ===0) {
        return  res.status(200).json(new ApiResponse(200,[], "No categories found"))
    }

    return  res.status(200).json(new ApiResponse(200,categories,"Categories fetched successfully"))

})

const getCategoryById = asyncHandler(async (req,res) => {
    const categoryId = req.params.categoryId;

    

    if (!categoryId) {
            throw new ApiError(400,"Please provide a category id")
    }
    const category = await Category.findById(categoryId)

    if (!category) {
        throw new ApiError(404,"No category found with the provided id")
    }

    return res.status(200).json(new ApiResponse(200,category,"Single Category fetched successfully"))

})

const updateCategory =  asyncHandler(async (req,res) => {

    const categoryId = req.params.categoryId;
    const {name,description} = req.body;

    if (!categoryId) {
        throw new ApiError(400,"Please provide a valid category id")
    }
    if (!name && !description) {
         throw new ApiError(400,"Please provide atleast one field to update")
    }

   const updatedCategory =  await Category.findOneAndUpdate({_id:categoryId},{$set:{name,description}},{new:true})

    return res.status(200).json(new ApiResponse(200,updatedCategory,"Single category updated successfully"))

})
const deleteCategory = asyncHandler(async (req,res) => {
    
    const categoryId = req.params.categoryId;
    if (!categoryId) {
            throw new ApiError(400,"Please provide a valid category id")
    }

   await Category.findOneAndDelete({_id:categoryId})

   return res.status(200).json(new ApiResponse(200,{},"category deleted successfully"))

})


export {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}