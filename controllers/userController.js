const asyncHandler = require('express-async-handler')
const path = require('path')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { Router } = require('express')
const sendMail = require('../miscellaneous/sendMail')

// GENERATE TOKEN
const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '5m' })
}
// REGISTER USER
const registerUser = asyncHandler(async (req, res) => {
  try {
  } catch (error) {}
  const { name, email, password } = req.body

  // OPTIONS FOR COOKIES
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  }

  // CHECK IF NAME, EMAIL, PASSWORD ARE PRESENT
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Pleae fill in the required info')
  }

  // CHECK IF PASSWORD'S LENGTH IS GREATER THAN 4
  if (password?.length < 4) {
    res.status(400)
    throw new Error('Password can not be less that four(4) letters')
  }

  // CHECK IF USER ALREADY EXISTS
  const userEmail = await User.findOne({ email: email })
  if (userEmail) {
    res.status(400)
    throw new Error('User already exists')
  }

  // IF IT PASSES ALL THE ABOVE CONDITIONS, SEND EMAIL CONFIRMATION LINK
  // IF IT PASSES ALL THE ABOVE CONDITIONS, CREATE JWT

  const fileName = req.file?.filename
  const fileUrl = fileName ? path?.join(fileName) : null

  //  CREATE NEW USER
  const user = {
    name,
    email,
    password,
    // avatar: fileUrl,
  }

  // GENERATE TOKEN
  const token = generateToken(user)

  // ACTIVATION URL
  const activationUrl = `http://localhost:3000/${token}`

  try {
    await sendMail({
      email: user.email,
      subject: 'Activate your account',
      message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
    }).then(() =>
      res.status(200).json({
        message: `please check your email:- ${user.email} to activate your account!`,
      })
    )
  } catch (error) {
    console.log(error)
  }

  // const newUser = await User.create(user)
  // if (newUser) {
  //   const { password, ...others } = newUser?._doc

  //   res.status(200).json({ ...others, token: token })
  // } else {
  //   res.status(500)
  //   throw new Error('Something went wrong!')
  // }
})

// ACTIVATE USER
const activateUser = async (req, res) => {
  try {
  } catch (error) {}
}

module.exports = {
  registerUser,
}
