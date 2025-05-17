import joi from "joi";
import { roles } from "../constant/enum.js";

//generalFields
export const userFields = {
 name:joi.string().min(3).required(),
 email:joi.string().email().required(),
 password:joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)).required(),
 rePassword:joi.string().valid(joi.ref("password")).required(),
 role:joi.string().valid(...Object.values(roles))
};
