import mongoose from "mongoose";

const dbconnection = async () => {
 return mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log(`DB Connected: ${process.env.DB_URL}`);
    })
    .catch((err) => {
      console.log("Failed to connect to DB", err);
    });
};

export default dbconnection;