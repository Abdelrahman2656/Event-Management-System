import { User } from "../../../Database/index.js"
import { AppError } from "../../Utils/AppError.js"
import { messages } from "../../Utils/constant/messages.js"

import i18n from "../../Utils/I18n/i18n.js"
//------------------------------------------------------add admin--------------------------------------------------------
export const addAdmin = async(req,res,next)=>{
    //lang
    const lang = req.query.lang || "en";
  i18n.setLocale(lang);
//get data from req 
let {name , email ,password,role}= req.body 
//checkExist 
const userExist = await User.findOne({email})
if(!userExist){
    return next(new AppError(i18n.__(messages.user.alreadyExist),409))
}
//prepare data
const user = new User({
    name ,
    password ,
    email ,
    role
})
//save to db
const userCreated = await user.save()
if(!userCreated){
    return next(new AppError(i18n.__(messages.user.failToCreate),500))
}
//send response 
return res.status(201).json({message:i18n.__(messages.user.createdSuccessfully),success:true , adminData:userCreated})

}
//------------------------------------------------------update User--------------------------------------------------------