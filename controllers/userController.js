const asyncHandler = require("express-async-handler");
const path = require("path");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const sendMail = require("../miscellaneous/sendMail");

// GENERATE TOKEN
const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
// REGISTER USER
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // CHECK IF NAME, EMAIL, PASSWORD ARE PRESENT
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Pleae fill in the required info");
  }

  // CHECK IF PASSWORD'S LENGTH IS GREATER THAN 4
  if (password?.length < 4) {
    res.status(400);
    throw new Error("Password can not be less that four(4) letters");
  }

  // CHECK IF USER ALREADY EXISTS
  const userEmail = await User.findOne({ email: email });
  if (userEmail) {
    res.status(400);
    throw new Error("User already exists");
  }

  // IF IT PASSES ALL THE ABOVE CONDITIONS, SEND EMAIL CONFIRMATION LINK
  // IF IT PASSES ALL THE ABOVE CONDITIONS, CREATE JWT

  const fileName = req.file?.filename;
  const fileUrl = fileName ? path?.join(fileName) : null;

  //  CREATE NEW USER
  const user = {
    name,
    email,
    password,
    // avatar: fileUrl,
  };

  // GENERATE TOKEN
  const token = generateToken(user);

  // ACTIVATION URL
  const activationUrl = `http://localhost:3000/activate/${token}`;

  await sendMail({
    email: user.email,
    subject: "Activate your account",
    message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
  })
    .then(() =>
      res.status(200).json({
        message: `please check your email:- ${user.email} to activate your account!`,
      })
    )
    .catch((error) => {
      res.status(500);
      throw new Error(error);
    });
});

// ACTIVATE USER
const activateUser = asyncHandler(async (req, res) => {
  const { activation_token } = req.body;

  // OPTIONS FOR COOKIES
  const options = {
    path: "/",
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: false,
    sameSite: "none",
    secure: false,
  };

  // CHECK IF THE ACTIVATION TOKEN IS PRESENT IN THE BODY
  if (!activation_token) {
    res.status(400);
    throw new Error(
      "Please send your token. Please send the token in this format {activation_token:token}"
    );
  }

  // CHECK IF TOKEN IS VALID
  const user = jwt.verify(activation_token, process.env.JWT_SECRET);

  // THROW ERROR FOR AN INVALID TOKEN
  if (!user) {
    res.status(400);
    throw new Error("Invalid Token");
  }

  // CHECK IF USER EXISTS ALREADY
  const { email } = user?.user;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const token = activation_token;
  res.status(200).cookie("token", token, options).json("Check cookie");

  // CREATE USER
  // const newUser = await User.create(user?.user);
  // if (newUser) {
  //   // SEND COOKIE
  //   res.cookie("token", activation_token, options);
  //   const { password, ...others } = newUser?._doc;
  //   res.status(200).json({ ...others });
  // } else {
  //   res.status(500);
  //   throw new Error("Something went wrong!");
  // }
});

module.exports = {
  registerUser,
  activateUser,
};
