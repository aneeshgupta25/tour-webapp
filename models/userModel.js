const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'User must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid Email ID!'],
  },
  profilePic: String,
  password: {
    type: String,
    required: [true, 'User must have password'],
    minlength: [8, 'Password must have a length of 8'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Kindly confirm your password'],
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: "Password doesn't match with ConfirmPassword",
    },
  },
});

const User = new mongoose.model('User', userSchema);
module.exports = User;
