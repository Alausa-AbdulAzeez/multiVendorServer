const asyncHandler = require('express-async-handler')

// REGISTER USER
const registerUser = async (req, res) => {
  const { name, email, password } = req.body
  // CHECK IF NAME, EMAIL, PASSWORD ARE PRESENT
  // console.log(name, email, password)
  // if (!name || !email || !password) {
  //   res.status(400)
  //   throw new Error('Pleae fill in the required info')
  // } else {
  //   res.status(201)
  //   throw new Error('Successful')
  // }

  try {
    if (!name || !email || !password) {
      res.status(402)
      throw new Error('Pleae fill in the required info')
    } else {
      res.status(201)
      throw new Error('Successful')
    }
  } catch (error) {
    res.json(error?.Error)
    console.log(error)
  }
}

module.exports = {
  registerUser,
}
