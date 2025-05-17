import slugify from "slugify";
import { Event } from "../../../Database/index.js";
import { AppError } from "../../Utils/AppError.js";
import cloudinary from "../../Utils/Cloudinary/cloud.js";
import { messages } from "../../Utils/constant/messages.js";
import i18n from "../../Utils/I18n/i18n.js";
import { ApiFeature } from "../../Utils/ApiFeature/apiFeature.js";


//------------------------------------------------------create event--------------------------------------------------------
export const createEvent = async (req, res, next) => {
  //lang
  const lang = req.query.lang || "en";
  i18n.setLocale(lang);
  //get data from req
  let { eventName, description, category, venue, price, date } = req.body;
  const userId = req.authUser._id;

  // Check if all required fields
  if (!req.file) {
    return next(new AppError(i18n.__(messages.event.missingFields), 400));
  }

  //check event existence
  const eventExist = await Event.findOne({ eventName });
  if (eventExist) {
    return next(new AppError(i18n.__(messages.event.alreadyExist), 409));
  }

  //upload image
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file?.path,
    {
      folder: `Booking System/Users/${userId}/Events`,
    }
  );
  console.log(req.file.path);

  //prepare data
  const slug = slugify(eventName);
  const event = new Event({
    eventName,
    slug,
    image: { secure_url, public_id },
    description,
    price,
    category,
    venue,
    date,
    createdBy:userId
  });
  //save to db
  const eventCreated = await event.save();
  if (!eventCreated) {
    req.failImage = { public_id };
    return next(new AppError(i18n.__(messages.event.failToCreate), 500));
  }
  //send response
  return res
    .status(200)
    .json({
      message: i18n.__(messages.event.createdSuccessfully),
      success: true,
      eventData: eventCreated,
    });
};
//------------------------------------------------------get all event--------------------------------------------------------
export const allEvents = async(req,res,next)=>{
      //lang
  const lang = req.query.lang || "en";
  i18n.setLocale(lang);
    const {page = 1 , size=3}=req.query
    //totalEvents
   const totalQuery = new ApiFeature(Event.find(), req.query).filter().search();
    const TotalEvents = await totalQuery.mongooseQuery.clone().countDocuments();
    const apiFeature = new ApiFeature(Event.find(),req.query).pagination().sort().select().filter().search()
    const events = await apiFeature.mongooseQuery
    //totalPages
    const TotalPages = Math.ceil(TotalEvents/size)
    //currentPage
    const CurrentPage= parseInt(page)
    //send response
    return res.status(200).json({success:true ,results:{
        EventData:events,
        TotalEvents,
        TotalPages,
        CurrentPage
    }})
}
//------------------------------------------------------get event by id--------------------------------------------------------
export const  eventById = async(req,res,next)=>{
          //lang
  const lang = req.query.lang || "en";
  i18n.setLocale(lang);
//get id from params
const {eventId}= req.params

//check event exist
const eventExist = await Event.findById(eventId)
if(!eventExist){
    return next(new AppError(i18n.__(messages.event.notFound),404))
}
//share link 
const ShareEventLink = `${process.env.BASE_URL}api/v1/event-by-id/${eventExist._id}`
//send response
return res.status(200).json({success:true , ShareEventLink , EventByIdData:eventExist})
}
//------------------------------------------------------update event--------------------------------------------------------
export const updateEvent = async (req, res, next) => {
  const lang = req.query.lang || "en";
  i18n.setLocale(lang);
  //get data from req 
  let { eventName, description, category, venue, price ,date} = req.body;
  const {eventId }= req.params;
  //check event exist
  const eventExist = await Event.findById(eventId)
  if(!eventExist){
return next(i18n.__(messages.event.notFound),404)
  }
  //update data
  if(eventName){
     const slug = slugify(eventName)
    eventExist.eventName=eventName,
    eventExist.slug=slug
  }
  if(description){
    eventExist.description=description
  }
  if(price){
    eventExist.price=price
  }
  if(category){
eventExist.category=category
  }
  if(venue){
    eventExist.venue=venue
  }
  if(date){
eventExist.date=date
  }
  if(req.file){
  const {secure_url,public_id} =await cloudinary.uploader.upload(req.file?.path,{
    public_id:eventExist.image.public_id,
    overwrite:true
  })
  eventExist.image= {secure_url,public_id}
  req.failImage= {secure_url,public_id}
  }
  //update in db
  const eventUpdated = await eventExist.save()
  if(!eventUpdated){
    req.failImage= {secure_url,public_id}
    return next(new AppError(i18n.__(messages.event.failToUpdate),500))
  }
  //send response
  return res.status(200).json({message:i18n.__(messages.event.updateSuccessfully),success:true , eventUpdated})
};
//------------------------------------------------------delete event--------------------------------------------------------
export const deleteEvent = async(req,res,next)=>{
 const lang = req.query.lang || "en";
  i18n.setLocale(lang);
  //get event id
  const {eventId}= req.params
  //check exist
  const eventExist = await Event.findById(eventId)
  if(!eventExist){
return next(new AppError(i18n.__(messages.event.notFound),404))
  }
  //delete image
  if(eventExist.image?.public_id){
    try{
    await cloudinary.uploader.destroy(eventExist.image.public_id)
    }catch(cloudinaryError){
  return next(new AppError('Failed to delete image from Cloudinary', 500));
    }
     
  }
//send to db
const deleteEvent = await Event.findByIdAndDelete(eventId)
if(!deleteEvent){
   return next(new AppError(i18n.__(messages.event.failToDelete),500))
}
//send response
return res.status(200).json({message:i18n.__(messages.event.deleteSuccessfully),success:true,deleteEvent})
}