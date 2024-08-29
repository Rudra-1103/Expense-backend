import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/category.controller.js";

const router = Router()


router.route("/create").post(verifyJWT,createCategory)
router.route("/get").get(verifyJWT,getCategories)
router.route("/get/:categoryId").get(verifyJWT,getCategoryById)
router.route("/update/:categoryId").patch(verifyJWT,updateCategory)
router.route("/delete/:categoryId").delete(verifyJWT,deleteCategory)


export default router