const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "nepalhaat",
    });
  } catch (error) {
    throw error;
  }
};

module.exports = dbConnection;
