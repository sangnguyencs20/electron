const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const hashPassword = require("../utils/helperAuth");
const getAllUsers = async (req, res) => {
  return await User.find()
    .populate("department")
    .select(
      "_id username fullName role department position address walletAddress"
    );
};

const createOneUser = async (user) => {
  const newUser = new User(user);
  await newUser.save();
  return newUser;
};

const getOneUserById = async (id) => {
  const user = await User.findById(id).populate("department");
  return user;
};

const isUserExist = async (username) => {
  const user = await User.findOne({ username });
  if (user) {
    return true;
  }
  return false;
};

const getUserByName = async (username) => {
  const user = await User.findOne({ username }).populate("department");
  return user;
};

const isPasswordMatched = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};
// username: {
//     type: String,
//     required: [true, 'Please enter a username'],
//     unique: true,
// },
// password: {
//     type: String,
//     required: [true, 'Please enter a password']
// },
// fullName: {
//     type: String,
//     required: [true, 'Please enter your name']
// },
// dateOfBirth: {
//     type: Date,
//     required: [true, 'Please enter your date of birth'],
// },
// address: {
//     type: String,
//     required: [true, 'Please enter your address'],
// },
// phoneNumber: {
//     type: String,
//     required: [true, 'Please enter your phone number'],
// },
// email: {
//     type: String,
//     required: [true, 'Please enter your email'],
// },
// position: {
//     type: String,
//     //can be Enum if needed
//     required: [true, 'Please enter your position'],
// },
// ssn: {
//     type: String,
//     required: [true, 'Please enter your SSN'],
//     unique: true,
// },
// department: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: [true, 'Please enter your department'],
//     ref: 'Department'
// }

const updateOneUser = async (req, res) => {
  const { id } = req.params;
  const {
    username,
    password,
    fullName,
    dateOfBirth,
    address,
    phoneNumber,
    email,
    position,
    ssn,
    department,
  } = req.body;
  const user = await getOneUserById(id);
  if (username) {
    user.username = username;
  }
  if (password) {
    user.password = password;
  }
  if (fullName) {
    user.fullName = fullName;
  }
  if (dateOfBirth) {
    user.dateOfBirth = dateOfBirth;
  }
  if (address) {
    user.address = address;
  }
  if (phoneNumber) {
    user.phoneNumber = phoneNumber;
  }
  if (email) {
    user.email = email;
  }
  if (position) {
    user.position = position;
  }
  if (ssn) {
    user.ssn = ssn;
  }
  if (department) {
    user.department = department;
  }
  await user.save();
};

const deleteOneUser = async (req, res) => {
  const { id } = req.params;
  const user = await getOneUserById(id);
  await user.remove();
};

module.exports = {
  getAllUsers,
  createOneUser,
  isPasswordMatched,
  getUserByName,
  getOneUserById,
  updateOneUser,
  deleteOneUser,
  isUserExist,
};
