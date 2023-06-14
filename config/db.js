const mongoose = require('mongoose');

const connectToDB = async () => {
  return mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
      console.log("database connected succesfully");
    })
    .catch((err) => console.log(err.message, "connection failed!"));
};

const disconnectDB = async () => {
  return mongoose.disconnect();
};

module.exports = { connectToDB, disconnectDB };