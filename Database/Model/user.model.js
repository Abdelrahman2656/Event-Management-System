import { model, Schema } from "mongoose";
import { roles } from "../../Src/Utils/constant/enum.js";
import { hashPassword } from "../../Src/Utils/Encryption/hash.js";

//schema 
const userSchema =  new Schema({
name:{
   type : String , 
   required:true , 
   trim :true 
},
email:{
    type:String , 
    unique :true ,
    trim:true ,
    required:true
},
role:{
    type:String, 
    enum : Object.values(roles),
    default:roles.USER
},
password:{
    type:String , 
    required:true
}

},{
    timestamps : true
})
//hashPassword
userSchema.pre("save",function(next){
if(this.isModified("password")){
    this.password=hashPassword({
        password :this.password,
        saltRound :process.env.SALT_ROUND
    })

}
next()
})
//model
export const User = model("User",userSchema)