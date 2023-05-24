const asyncHandler = require('express-async-handler')
const path = require('path')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// GENERATE TOKEN
const generateToken = (id) => {
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '5m' })
}
// REGISTER USER
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

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
  const token = generateToken(user._id)

  const newUser = await User.create(user)

  if (newUser) {
    const { password, ...others } = newUser?._doc
    console.log(token)
    res.status(200).json({ ...others, token: 'token' })
  } else {
    res.status(500)
    throw new Error('Something went wrong!')
  }
})

module.exports = {
  registerUser,
}
