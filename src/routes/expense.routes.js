import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { createExpense, deleteExpense, getAllExpenses, getExpenseById, updateExpense } from "../controllers/expense.controller.js"

const router = Router()

router.route("/create").post(verifyJWT,createExpense)
router.route("/get").get(verifyJWT,getAllExpenses )
router.route("/get/:expenseId").get(verifyJWT, getExpenseById)
router.route("/get/:expenseId").post(verifyJWT, updateExpense)
router.route("/get/:expenseId").delete(verifyJWT, deleteExpense)

 
export default router