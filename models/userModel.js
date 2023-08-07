const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
  },
  username: String,
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
  },
  phone: {
    type: Number,
    required: [true, 'A user must have an number'],
    unique: true,
  },
  website: {
    type: String,
    lowercase: true,
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    landmark: String,
    zipcode: {
      type: Number,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
