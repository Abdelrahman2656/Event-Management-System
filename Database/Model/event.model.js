import { model, Schema } from "mongoose";
import { eventCategory } from "../../Src/Utils/constant/enum.js";


//schema
const eventSchema = new Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  description:{
    type:String ,
    trim:true , 
    required:true 
  },
  category:{
    type:String,
    enum:Object.values(eventCategory),
    required:true
  },
  venue:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true 

  },
  image:{
    secure_url:{
        type:String,
        required:true
    },
    public_id:{
           type:String,
        required:true
    }
  },
  date:{
     type: String,
    required:true
  },
  createdBy:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }
},{
    timestamps:true
});

//model
export const Event = model("Event",eventSchema)