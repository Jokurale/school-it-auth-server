const mongoose = require("mongoose");

// Database connection
mongoose.connect(
  process.env.MONGO_DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log(
      "[Mongo DB Atlas] Connection with DBaaS established successfully."
    );
  }
);

// Misc mongoose connection params
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

module.exports = mongoose;
