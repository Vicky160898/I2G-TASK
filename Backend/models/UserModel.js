const { Schema, model } = require("mongoose");

//this is the user Schema...

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
  },
});

// Define the models for user.

const User = model("User", userSchema);

module.exports = User;
