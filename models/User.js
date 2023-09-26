const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Specifying the DB name in Schema to handle multiple DB
const userDB = mongoose.connection.useDb('UserDB');
 
module.exports = userDB.model("UserModel", userSchema,"userCollection");