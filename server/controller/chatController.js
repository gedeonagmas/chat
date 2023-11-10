const { groupModel } = require('./../models/groupModel');
const { chats } = require('./../models/chatsModel');
const { Signup } = require('../models/signupModel');
const { upload } = require('./../utils/upload');
const cloudinary = require('./../config/cloudinary');

const groupCreateHandler = async (req, res) => {
  try {
    if (req.files.groupPro === undefined) {
      const data = await groupModel.create({
        groupName: req.body.groupName,
        flag: req.body.flag,
        ownersName: req.body.ownersName,
        ownersId: req.body.ownersId,
        members: req.body.members,
        requests: [],
        groupPro:
          'https://res.cloudinary.com/dkvjvnil8/image/upload/v1689691516/defaultGroup.jpg',
      });
      res.status(200).send(data);
    }
    cloudinary.uploader.upload(
      req.files.groupPro[0].path,
      async function (err, result) {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ msg: 'something went wrong group not created' });
        }
        const data = await groupModel.create({
          groupName: req.body.groupName,
          flag: req.body.flag,
          ownersName: req.body.ownersName,
          ownersId: req.body.ownersId,
          members: req.body.members,
          requests: [],
          groupPro: result.url,
        });
        return res.status(200).send(data);
      }
    );
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

//group get
const groupGetHandler = async (req, res) => {
  try {
    const data = await await groupModel.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
//singel group handler
const singleGroupGetHandler = async (req, res) => {
  try {
    const data = await groupModel.find({ _id: req.query.ids });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
//get own group
//singel group handler
const getOwnGroupHandler = async (req, res) => {
  try {
    const data = await groupModel.find({ ownersId: req.query.ids });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//add group member handler
const addGroupMemberHandler = async (req, res) => {
  try {
    const data = await groupModel.updateOne(
      { _id: req.query.ids },
      {
        $set: {
          members: req.body.members,
        },
      }
    );
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
//join request handler
const joinRequestHandler = async (req, res) => {
  try {
    const data = await groupModel.updateOne(
      { _id: req.query.ids },
      {
        $set: {
          requests: req.body.requests,
        },
      }
    );
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteGroupHandler = async (req, res) => {
  try {
    const data = await groupModel.deleteOne({ _id: req.query.ids });
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const chatsHandler = async (req, res) => {
  try {
    const data = await chats.create({
      chatOwners: req.body.chatOwners,
      chatId: req.body.chatId,
      messages: req.body.messages,
      chatType: req.body.chatType,
    });
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
// ################################ get private chat handler ######################
const getPrivateChatHandler = async (req, res) => {
  try {
    const data = await chats.find({ chatId: req.query.ids });
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getPrivateChatHandlerSpecial = async (req, res) => {
  try {
    const data = await chats.find({ chatId: req.body.ids });
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
//################################# update private chate handler #######################
const updatePrivateChatHandler = async (req, res) => {
  try {
    const data = await chats.updateOne(
      { chatId: req.query.ids },
      {
        $set: {
          chatOwners: req.body.chatOwners,
          chatId: req.body.chatId,
          messages: req.body.messages,
          chatType: req.body.chatType,
        },
      }
    );
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const data = await Signup.find({ _id: req.query.ids });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const fileHandler = (val) => {
  return val.toFixed(2);
};
const fileSendHandler = async (req, res) => {
  try {
    const data = await chats.findOne({
      chatId: req.body.chatId,
    });
    cloudinary.uploader.upload(
      req.files.fileUpload[0].path,
      async function (err, result) {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ msg: 'something went wrong file not send' });
        }
        data.messages = [
          ...data.messages,
          {
            messageType: req.body.messageType,
            fileDescription: req.body.fileDescription,
            time: req.body.time,
            sender: req.body.sender,
            image: req.body.image,
            path: result.url,
            size: fileHandler(req.files.fileUpload[0].size / 1024 / 1024),
            originalName: req.files.fileUpload[0].originalname,
            mimeType: req.files.fileUpload[0].mimetype,
          },
        ];
        await data.save();
        return res.status(200).send(data);
      }
    );
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  groupCreateHandler,
  groupGetHandler,
  singleGroupGetHandler,
  getOwnGroupHandler,
  addGroupMemberHandler,
  joinRequestHandler,
  deleteGroupHandler,
  chatsHandler,
  getPrivateChatHandler,
  updatePrivateChatHandler,
  getSingleUser,
  fileSendHandler,
  getPrivateChatHandlerSpecial,
};
