
import multer, { diskStorage } from "multer";
import { AppError } from "../AppError.js";




export const fileValidation = {
  image: [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/gif",
    "image/svg+xml",
  ],
  videos: [
    "video/mp4",
    "video/mpeg",
    "video/ogg",
    "video/quicktime",
    "video/webm",
    "video/x-ms-wmv",
    "video/x-msvideo",
  ],
  audios: ["audio/midi", "audio/mpeg", "audio/webm", "audio/ogg", "audio/wav"],
  documents: ["application/javascript", "application/json", "application/pdf"],
};

export const cloudUpload = ({ allowType = fileValidation.image }={}) => {
  const storage = diskStorage({});
  //FileFilter
  const fileFilter = (req, file, cb) => {
    console.log(file);
    if (allowType.includes(file.mimetype)) {
      return cb(null, true);
    }
    cb(new AppError("invalid file format", 400), false);
  };
  return multer({
    storage,
    fileFilter,
 
  });
};
