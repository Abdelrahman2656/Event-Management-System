import { User } from "../../../Database/index.js"
import { AppError } from "../../Utils/AppError.js"
import { messages } from "../../Utils/constant/messages.js"
import { comparePassword } from "../../Utils/Encryption/compare.js"

import i18n from "../../Utils/I18n/i18n.js"
import { generateToken } from "../../Utils/Token/generateToken.js"
//------------------------------------------------------sign up--------------------------------------------------------
export const signUp = async(req,res,next)=>{
    //lang
    const lang = req.query.lang || "en";
  i18n.setLocale(lang);
//get data from req 
let {name , email ,password}= req.body 
//checkExist 
const userExist = await User.findOne({email})
if(userExist){
    return next(new AppError(i18n.__(messages.user.alreadyExist),409))
}
//prepare data
const user = new User({
    name ,
    password ,
    email ,
   
})
//save to db
const userCreated = await user.save()
if(!userCreated){
    return next(new AppError(i18n.__(messages.user.failToCreate),500))
}
//send response 
return res.status(201).json({message:i18n.__(messages.user.createdSuccessfully),success:true , userData:userCreated})

}
//------------------------------------------------------login--------------------------------------------------------
export const login = async(req,res,next)=>{
     //lang
    const lang = req.query.lang || "en";
    i18n.setLocale(lang);
    //get data from req 
    const {email ,password}= req.body
    //check exist
    const userExist = await User.findOne({email})
    if(!userExist){
    return next(new AppError(i18n.__(messages.user.notFound),404))
    } 
    //compare password
    let match = comparePassword({
        password,
        hashedPassword:userExist.password
    })
    if(!match){
     return next(new AppError(i18n.__(messages.user.Incorrect),400))
    }
    //generate token
    const accessToken = generateToken({
       payload :{ email , _id:userExist._id},
       options:{expiresIn: process.env.JWT_EXPIRE_TIME}  
    })
    //send response
    return res.status(200).json({message:i18n.__(messages.user.loginSuccessfully),success:true , access_token:accessToken })
   
}