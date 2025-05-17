
import { AppError } from "../Utils/AppError.js";



//validation
export const isValid = (schema) => {
  return (req, res, next) => {
    let data = { ...req.body, ...req.params, ...req.query };
    let { error } = schema.validate(data, { abortEarly: false ,allowUnknown: true });
    if (error) {
      let errArr = [];
      error.details.forEach((err) => {
        errArr.push(err.message);
      });
      console.log(errArr);
      return next(new AppError(errArr.join(", "), 400));
    }
    next();
  };
};
