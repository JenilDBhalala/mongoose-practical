const mongoose = require('mongoose');

const connectToDB = async () => {
  await mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
      console.log("database connected succesfully");
    })
    .catch((err) => console.log(err.message, "connection failed!"));
};

module.exports = connectToDB;