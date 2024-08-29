import { Schema, model } from "mongoose";

const expenseSchema = new Schema({
    title:{
             type: String,
             required: [true,"Please add a title"]
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required:[true,"Please add a category"]
    },
    description:{
        type: String,
        required: [true,"Please add a description"]
    },
    date:{
        type: Date,
        default: Date.now()
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    amount:{
        type: Number, 
        required: [true,"Please add an amount"]
    }
}, { timestamps: true })

export const Expense = model("Expense", expenseSchema);