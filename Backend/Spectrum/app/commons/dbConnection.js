require('dotenv').config();
const mongoose = require("mongoose");

mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then(() => {
    console.log("DB connection established");
  })
  .catch((err) => console.log(err));
