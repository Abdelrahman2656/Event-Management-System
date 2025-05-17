import { User } from "../../Database/index.js"
import { AppError } from "../Utils/AppError.js"
import { messages } from "../Utils/constant/messages.js"
import i18n from "../Utils/I18n/i18n.js"
import { verifyToken } from "../Utils/Token/verifyToken.js"


export const isAuthentication =async (req,res,next)=>{
    //lang
     const lang = req.query.lang || "en";
        i18n.setLocale(lang);
    //get token 
        const {authorization}= req.headers
        if(!authorization?.startsWith("Bearer")){
        return next(new AppError(i18n.__(messages.user.InvalidBearerToken,409)))
        }
        const token = authorization.split(" ")[1]
        // decode token 
        const payload =  verifyToken({
            token ,
            secretKey:process.env.SECRET_KEY
        })
        if(payload.message){
            return next(new AppError(payload.message , 401))
        }
        //check user 
        let authUser = await User.findOne({_id: payload._id}) 
        if(!authUser){
            return next(new AppError(messages.user.notFound,404))
        }
        req.authUser=authUser
        next()
}