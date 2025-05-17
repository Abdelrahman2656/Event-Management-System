import joi from "joi";
import { userFields } from "../../Utils/GeneralFields/index.js";



//sign up 
export const signUp = joi.object({
    name:userFields.name,
    email:userFields.email,
    password:userFields.password,
   rePassword:userFields.rePassword
}).required()
//login 
export const login = joi.object({
     email:userFields.email,
    password:userFields.password,
}).required()