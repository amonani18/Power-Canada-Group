import crypto from 'crypto';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  email: {
    type: String,
    trim: true,
    unique: true, // Ensure no duplicate emails
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  hashed_password: {
    type: String,
    required: 'Password is required'
  },
  salt: String
});

// Add methods to UserSchema here if not already implemented
UserSchema.methods.encryptPassword = function(password) {
  if (!password) return '';
  try {
    return crypto.createHmac('sha256', this.salt).update(password).digest('hex');
  } catch (err) {
    return '';  // This catch might be silencing important errors
  }
};

UserSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt(); // Ensure this method is working correctly
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

UserSchema.methods.makeSalt = function() {
  return Math.round((new Date().valueOf() * Math.random())) + '';
};

export default mongoose.model('User', UserSchema);
