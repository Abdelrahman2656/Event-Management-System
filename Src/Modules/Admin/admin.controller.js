import { Router } from "express";
import { asyncHandler } from "../../Middleware/asyncHandler.js";
import { isAuthentication } from "../../Middleware/authentication.js";
import { isAuthorization } from "../../Middleware/authorization.js";
import { isValid } from "../../Middleware/validation.js";
import { roles } from "../../Utils/constant/enum.js";
import * as adminService from "./admin.service.js";
import * as adminValidation from "./admin.validation.js";
const adminRouter = Router()
//signUp
adminRouter.post('/add-admin' ,isAuthentication, isAuthorization([roles.ADMIN]),isValid(adminValidation.addAdmin),asyncHandler(adminService.addAdmin))
export default adminRouter