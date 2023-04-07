const generateToken = require("../config/generateToken");
const User = require("../models/UserModel");
const argon2 = require("argon2");

//here we creating the developer through the sign up and login..

const UserRegister = async (req, res) => {
  const { fullName, email, password } = req.body;

  //here we hashing the password..

  const hash = await argon2.hash(password);
  const finduser = await User.findOne({ email });
  try {
    if (!finduser) {
      const user = await User.create({
        fullName,
        email,
        profile,
        password: hash,
      });
      return res.status(201).json(user);
    }
    return res.status(401).send("User Already Present");
  } catch (error) {
    return res.status(401).send("Something wents wrong");
  }
};

//here we performing the authentication process taking password and email from user..

const UserLogin = async (req, res) => {
  const { email, password } = req.body;
  const finduser = await User.findOne({ email });
  try {
    //here we verifying the password through argon2..
    if (finduser && (await argon2.verify(finduser.password, password))) {
      return res.status(201).json({
        _id: finduser._id,
        email: finduser.email,
        fullName: finduser.fullName,
        profile: finduser.profile,
        token: generateToken(finduser),
      });
    } else {
      return res.status(401).send("Invalid Credential");
    }
  } catch (error) {
    return res.status(401).send("Something wents wrong");
  }
};

//here we updating the userProfile...

const UpdateProfile = async (req, res) => {
  const { pic } = req.body;
  const findProfile = await User.findOne({ _id: req.id });
  try {
    if (!findProfile) {
      return res.status(400).send("Profile Not Found");
    } else {
      const Update = await User.findByIdAndUpdate(
        { _id: req.id },
        { $set: { profile: pic } },
        { new: true }
      );
      return res.status(200).send(Update);
    }
  } catch (error) {
    return res.status(401).send("Something wents wrong");
  }
};

module.exports = { UserRegister, UserLogin, UpdateProfile };
