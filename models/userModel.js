const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Kindly confirm your password'],
    select: false,
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: "Password doesn't match with ConfirmPassword",
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = function (
  candidatePassword,
  userPassword,
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

const User = new mongoose.model('User', userSchema);
module.exports = User;
