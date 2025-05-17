
import { Router } from "express";
import { asyncHandler } from "../../Middleware/asyncHandler.js";
import { isAuthentication } from "../../Middleware/authentication.js";
import { isAuthorization } from "../../Middleware/authorization.js";
import { isValid } from "../../Middleware/validation.js";
import { cloudUpload } from "../../Utils/Cloudinary/cloudUpload.js";
import { roles } from "../../Utils/constant/enum.js";
import * as eventService from "./event.service.js";
import * as eventValidation from "./event.validation.js";

const eventRouter = Router()
//create event 
eventRouter.post("/create-event" , 
    isAuthentication,
    isAuthorization([roles.ADMIN]),
    cloudUpload({}).single("image"),
    isValid(eventValidation.createEvent),
    asyncHandler(eventService.createEvent)
)
//update event 
eventRouter.put("/update-event/:eventId",
    isAuthentication,
    isAuthorization([roles.ADMIN]),
    cloudUpload({}).single("image"),
    isValid(eventValidation.updateEvent),
    asyncHandler(eventService.updateEvent)
)
//delete event
eventRouter.delete("/delete-event/:eventId",
    isAuthentication,
    isAuthorization([roles.ADMIN]),
    cloudUpload({}).single("image"),
    isValid(eventValidation.deleteEvent),
    asyncHandler(eventService.deleteEvent)
)
// get all events
eventRouter.get("/all-events",isAuthentication,isAuthorization([roles.ADMIN , roles.USER]),
asyncHandler(eventService.allEvents))
//get event by id
eventRouter.get("/event-by-id/:eventId",isAuthentication,isAuthorization([roles.ADMIN,roles.USER]),isValid(eventValidation.eventById),asyncHandler(eventService.eventById))
export default eventRouter