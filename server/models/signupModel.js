const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: String,
  phone: String,
  email: String,
  password: { type: String, selected: false },
  confirmPassword: String,
  status: { type: String, default: 'active' },
  profilePicture: {
    type: String,
    default:
      'https://res.cloudinary.com/dkvjvnil8/image/upload/v1689691516/defaultProfile.jpg',
  },
});

schema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

schema.methods.checkPasswordMatch = async function (
  password,
  candidatePassword
) {
  return await bcrypt.compare(password, candidatePassword);
};
exports.Signup = mongoose.model('user', schema);
