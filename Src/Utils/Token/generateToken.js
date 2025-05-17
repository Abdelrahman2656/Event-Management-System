import jwt from "jsonwebtoken"
export const generateToken = ({payload , secretKey = process.env.SECRET_KEY , options=process.env.JWT_EXPIRE_TIME})=>{
    return jwt.sign(payload , secretKey ,options)
}