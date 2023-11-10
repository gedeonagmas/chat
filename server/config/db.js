const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/CHAT';
const uri = process.env.MONGO_URL;
async function mongodb() {
  await mongoose.connect(uri);
  console.log('chat database connected successfully');
}

module.exports = mongodb;
