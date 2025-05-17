import joi from "joi";

export const bookingFields = {
    objectId:joi.string().hex().length(24)
}