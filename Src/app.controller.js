import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import dbconnection from "../Database/dbconnection.js";

import globalError from "./Middleware/asyncHandler.js";
import i18n from "./Utils/I18n/i18n.js";
import { limiter } from "./Utils/Rate-Limiter/rate-limiter.js";
import { adminRouter, bookingRouter, eventRouter, userRouter } from "./Modules/index.js";




const bootstrap  =async(app,express) => {
  //rate limiter
  app.use(limiter)
  //morgan
  if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
  }  
  //dotenv
  dotenv.config({ path: path.resolve("./.env") });
  //use cors middleware
  app.use(cors());
  //app use json
  app.use(express.json());
  //i18n
  app.use(i18n.init)
  //database
   dbconnection()
  // Router
 app.use("/api/v1",userRouter)
 app.use("/api/v1",adminRouter)
 app.use("/api/v1",eventRouter)
 app.use("/api/v1",bookingRouter)

  //global error handling
  app.use(globalError);
};
export default bootstrap