import { model, Schema } from "mongoose";

//schema
const bookingSchema = new Schema({
    userBookingId:{
        type:Schema.Types.ObjectId,
        ref:"User",

    },
    eventId:{
    type:Schema.Types.ObjectId,
        ref:"Event",
    }
},{
    timestamps:true
})
//model
export const Booking = model("Booking",bookingSchema)