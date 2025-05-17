import { Booking, Event } from "../../../Database/index.js"
import { AppError } from "../../Utils/AppError.js"
import { messages } from "../../Utils/constant/messages.js"
import i18n from "../../Utils/I18n/i18n.js"

//------------------------------------------------------Add Booking--------------------------------------------------------
export const addBooking = async(req,res,next)=>{
              //lang
      const lang = req.query.lang || "en";
      i18n.setLocale(lang);
//get data from params
const userId = req.authUser._id
const {eventId} = req.params
//check event exist 
const eventExist = await Event.findById(eventId)
if(!eventExist){
    return next(new AppError(i18n.__(messages.event.notFound),404))
}
//check event booked
const bookingExist = await Booking.findOne({userBookingId:userId , eventId})
if(bookingExist){
    return next(new i18n.__(messages.booking.alreadyExist),400)
}
//create booking
const booking = new Booking({
 userBookingId:userId,
 eventId
})
//save to db
const bookingCreated = await booking.save()
if(!bookingCreated){
return next(new AppError(i18n.__(messages.booking.failToCreate),500))
}
//send response 
return res.status(200).json({message:i18n.__(messages.booking.createdSuccessfully),success:true , BookingData:bookingCreated})
}
//get all booking
export const getAllBookingByID = async(req,res,next)=>{
    //lang
     const lang = req.query.lang || "en";
      i18n.setLocale(lang);
      //get booking id from params
      const{bookingId}= req.params
      //check exist 
      const bookingExist = await Booking.findById(bookingId).populate([
        {path:"userBookingId" , select:"name"},
        {path:"eventId" , select:"eventName price description"}
      ])
      if(!bookingExist){
        return next(new AppError(i18n.__(messages.booking.notFound),404))
      }
      //send response
      return res.status(200).json({success:true , BookingData:bookingExist})
}
//all booking 
export const allBooking  = async(req,res,next)=>{
    //lang
     const lang = req.query.lang || "en";
      i18n.setLocale(lang);
      
    
      //check exist 
      const bookingExist = await Booking.find().populate([
        {path:"userBookingId" , select:"name"},
        {path:"eventId" , select:"eventName price description"}
      ])
      const TotalBooking = await Booking.find().countDocuments()
      if(!bookingExist){
        return next(new AppError(i18n.__(messages.booking.notFound),404))
      }
      //send response
      return res.status(200).json({success:true , BookingData:bookingExist ,TotalBooking})
}
