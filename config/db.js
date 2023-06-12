const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {console.log('database connected succesfully')})
.catch((err) => console.log(err.message,'connection failed!'))