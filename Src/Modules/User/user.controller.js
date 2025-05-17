import { Router } from "express";
import { asyncHandler } from "../../Middleware/asyncHandler.js";
import { isValid } from "../../Middleware/validation.js";
import * as userService from "./user.service.js";
import * as userValidation from "./user.validation.js";
const userRouter = Router()
//signUp
userRouter.post('/signUp' ,isValid(userValidation.signUp),asyncHandler(userService.signUp))
//login 
userRouter.post("/login",isValid(userValidation.login),asyncHandler(userService.login))
export default userRouter