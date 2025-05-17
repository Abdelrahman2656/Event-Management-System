import joi from "joi";
import { eventFields } from "../../Utils/GeneralFields/index.js";
//create event
export const createEvent = joi
  .object({
    eventName: eventFields.eventName,
    description: eventFields.description,
    category: eventFields.category,
    venue: eventFields.venue,
    price: eventFields.price,
    date:eventFields.date,
    createdBy: eventFields.objectId,
  })
  .required();
//update event
export const updateEvent = joi.object({
  eventName: eventFields.eventName,
  description: eventFields.description,
  category: eventFields.category,
  venue: eventFields.venue,
  price: eventFields.price,
   date:eventFields.date,
  eventId: eventFields.objectId.required()
}).required()
//deleted event 
export const deleteEvent = joi.object({

  eventId: eventFields.objectId.required()
}).required()
// event by id 
export const eventById = joi.object({

  eventId: eventFields.objectId.required()
}).required()
