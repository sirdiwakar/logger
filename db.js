const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

const connectDB = () => {
  mongoose
    .connect(DB)
    .then(() => {
      console.log("DataBase connection established successfully");
    })
    .catch((err) => {
      console.log("DB connection error", err);
    });
};

module.exports = connectDB;
