import pkj from "bcrypt"
export const hashPassword = ({password="" , saltRound=process.env.SALT_ROUND})=>{
return pkj.hashSync(password, parseInt(saltRound))
}