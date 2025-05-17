import { Router } from "express";
import { asyncHandler } from "../../Middleware/asyncHandler.js";
import { isAuthentication } from "../../Middleware/authentication.js";
import { isAuthorization } from "../../Middleware/authorization.js";
import { isValid } from "../../Middleware/validation.js";
import { roles } from "../../Utils/constant/enum.js";
import * as bookingService from "./booking.service.js";
import * as bookingValidation from "./booking.validation.js";
const bookingRouter = Router()
//add booking
bookingRouter.post("/add-booking/:eventId", isAuthentication,isAuthorization([roles.USER ]),isValid(bookingValidation.addBooking),asyncHandler(bookingService.addBooking))
//get booking
bookingRouter.get("/bookingById/:bookingId",isAuthentication,isAuthorization([roles.USER,roles.ADMIN]),isValid(bookingValidation.allBookingById),asyncHandler(bookingService.getAllBookingByID))
//get all booking
bookingRouter.get("/all-booking",isAuthentication,isAuthorization([roles.ADMIN , roles.USER]),asyncHandler(bookingService.allBooking))
export default bookingRouter