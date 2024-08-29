import { Router } from "express";
import { changeUserPassword, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateUserAccount } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

//protected routes

router.route("/logout").post(verifyJWT,logoutUser)
router.route("/update-account").patch(verifyJWT, updateUserAccount)
router.route("/refresh-token").post(verifyJWT, refreshAccessToken)
router.route('/me').get(verifyJWT,getCurrentUser)
router.route("/change-password").patch(verifyJWT, changeUserPassword )


export default router;

