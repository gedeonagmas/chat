const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
  groupName: { type: String },
  flag: { type: String },
  ownersName: { type: String },
  ownersId: { type: String },
  groupPro: {
    type: String,
    default:
      'https://res.cloudinary.com/dkvjvnil8/image/upload/v1689691516/defaultGroup.jpg',
  },
  members: { type: [String] },
  requests: { type: [String] },
});

module.exports.groupModel = mongoose.model('groups', groupSchema);
