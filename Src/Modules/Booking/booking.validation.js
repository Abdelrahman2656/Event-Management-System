import joi from "joi"
import { bookingFields } from "../../Utils/GeneralFields/index.js"
// add booking
export const addBooking = joi.object({
    userBookingId : bookingFields.objectId,
    eventId:bookingFields.objectId
})
//get booking by id
export const allBookingById = joi.object({
    bookingId:bookingFields.objectId
})