import mongoose from "mongoose";

export function connectToDB(){
  mongoose
    .connect(process.env.DB as string)
    .then(() => {
      console.log("database connected succesfully");
    })
    .catch((err) => console.log(err.message, "connection failed!"));
}

