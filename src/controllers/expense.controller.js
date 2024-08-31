import { Category } from "../models/category.model.js";
import { Expense } from "../models/expense.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const createExpense = asyncHandler(async (req, res) => {

    const{title,description,amount,categoryId} = req.body

    if (!title || !description || !amount) {
         throw new ApiError(400,'Please provide all the required fields')
    }
    const user = await User.findById(req.user._id);

    if (!user) {
         throw new ApiError(404,'User not found')
    }

    const category = await Category.findById(categoryId)

    if (!category) {
        throw new ApiError(404,'Category not found')
    }

    const createdExpense = await Expense.create({title,description,amount,userId:user._id,categoryId:category._id})

    if (!createdExpense) {
         throw  new ApiError(500,'Error occurred while creating the expense')
    }

    return res.status(201)
    .json(new ApiResponse(201,createdExpense,"Successfully created the expense"))

});

const getAllExpenses = asyncHandler(async (req,res)=>{

     const {limit,offset,categoryId} = req.query;

    const user = await User.findById(req.user._id)
    
    if (!user) {
        throw new ApiError(404,'User not found')
    }

    let query = {userId :user?._id}
    if (categoryId) {query.categoryId = categoryId }

    const expenses = await Expense.find(query).limit(limit).skip(offset);

    if (expenses?.length === 0) {
        return req.status(200).json(new ApiResponse(200, expenses, 'No Expenses Found'))
    }

    return res.status(200) .json(new ApiResponse(200,expenses,'Successfully fetched all the expenses'))
})

const getExpenseById = asyncHandler(async (req,res) => {
    
    const {expenseId} = req.params;

    if (!expenseId) {
         throw new ApiError(400,'Please provide all the required fields')
    }

    const user  = await User.findById(req.user._id)
    if (!user) {
         throw new ApiError(404,'User not found')
    }

    const expense = await Expense.find({_id:expenseId,userId:user?._id})

    return  res.status(200) .json(new ApiResponse(200, expense , 'Successfully fetched the expense'))

})

const updateExpense = asyncHandler(async (req,res) => {

    const {expenseId} = req.params;
    const {title,description,amount} = req.body;

    if (!title && !description && !amount) {
         throw new ApiError(400,'Please provide atleast one of the fields ')
    }

    if (!expenseId) {
        throw new ApiError(400,'Please provide all the required fields')
    }

    const user = await User.findById(req.user._id)
    if (!User) {
         throw new ApiError(404,'User not found')
    }

    await Expense.findByIdAndUpdate(expenseId,{title,description,amount})

    return res.status(200)
    .json(new ApiResponse(201,{},'Successfully updated the expense'))

})

const deleteExpense = asyncHandler(async (req,res) => {
    const {expenseId} = req.params;

    if (!expenseId) {
          throw new ApiError(400,'Please provide all the required fields')
    }

    const user = await User.findById(req.user._id)

    if (!user) {
          throw new ApiError(404,'User not found')
    }

    await Expense.deleteOne({_id:expenseId,userId:user?._id});

    return res.status(200)
    .json(new ApiResponse(200,{},'Successfully deleted the expense'))

})


export {
     createExpense ,
     getAllExpenses,
     getExpenseById,
     updateExpense,
     deleteExpense
    };

