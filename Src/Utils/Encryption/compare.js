import pkj from "bcrypt"
export const comparePassword = ({password="" , hashedPassword=""})=>{
return pkj.compareSync(password , hashedPassword)
}