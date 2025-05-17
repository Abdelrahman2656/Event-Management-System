import { AppError } from "../Utils/AppError.js";
import { deleteCloudImage } from "../Utils/Cloudinary/cloud.js";
import i18n from "../Utils/I18n/i18n.js";

export const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next)?.catch((err) => {
      const message = err.message || "Something went wrong";
      const statusCode = err.statusCode || 500;
      next(new AppError(message, statusCode));
    });
  };
};

//global error handling
const handelJwtInvalidSignature = () =>
  new AppError("Invalid token, Please login again", 401);

const handelJwtExpire = () =>
  new AppError("Expired token, Please login again", 401);

const sendErrorForDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorForprod = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const globalError = async (err, req, res, next) => {
  // for cloudinary
  if (req.failImage) {
    await deleteCloudImage(req.failImage.public_id);
  }
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
    if (err.name === "JsonWebTokenError") err = handelJwtInvalidSignature();
    if (err.name === "TokenExpiredError") err = handelJwtExpire();
    sendErrorForprod(err, res);
  }
};

export default globalError;
