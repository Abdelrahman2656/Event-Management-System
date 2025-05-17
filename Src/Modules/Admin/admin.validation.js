import joi from "joi";
import { userFields } from "../../Utils/GeneralFields/index.js";



//sign up 
export const addAdmin = joi.object({
    name:userFields.name,
    email:userFields.email,
    password:userFields.password,
    rePassword:userFields.rePassword,
    role:userFields.role
}).required()