import joi from "joi"
import { eventCategory } from "../constant/enum.js"
export const eventFields = {
eventName:joi.string().max(20).required(),
description:joi.string().max(300).required(),
category:joi.string().valid(...Object.values(eventCategory)).required(),
venue:joi.string().max(50).required(),
price:joi.number().positive(),
date:joi.date().greater(Date.now() - 24 * 60 * 60 *1000).required(),
objectId:joi.string().hex().length(24)
}