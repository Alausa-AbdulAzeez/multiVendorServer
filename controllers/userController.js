const asyncHandler = require('express-async-handler')

// REGISTER USER
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  try {
    // CHECK IF NAME, EMAIL, PASSWORD ARE PRESENT
    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Pleae fill in the required info')
    } else {
      res.status(201)
      throw new Error('Successful')
    }
  } catch (error) {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

module.exports = {
  registerUser,
}
