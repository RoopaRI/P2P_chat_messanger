const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  isOnline: { type: Boolean, default: false },
});

// Handle duplicate key errors in Mongoose
userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("Email or Mobile number already exists"));
  } else {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
