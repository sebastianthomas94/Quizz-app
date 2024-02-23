const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // can include other user details here like profile picture, bio, etc.
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
