const { Signup } = require("./../models/signupModel");
const { upload } = require("./../utils/upload");
const cloudinary = require("./../config/cloudinary");

exports.signupHandler = async (req, res, next) => {
  const { firstName, lastName, userName, email, phone, password } = req.body;
  if (req.files.profilePicture === undefined) {
    await Signup.create({
      firstName,
      lastName,
      userName,
      email,
      phone,
      password,
      profilePicture: "https://res.cloudinary.com/dkvjvnil8/image/upload/v1689691516/defaultProfile.jpg",
    });
    return res.status(201).json({ msg: "account created" });
  }
  cloudinary.uploader.upload(req.files.profilePicture[0].path, async function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "something went wrong data not uploaded" });
    }
    await Signup.create({
      firstName,
      lastName,
      userName,
      email,
      phone,
      password,
      profilePicture: result.url,
    });
    console.log(result);
    return res.status(201).json({ msg: "account created" });
  });
};
