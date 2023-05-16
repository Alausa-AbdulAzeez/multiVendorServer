const asyncHandler = require('express-async-handler')

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

  const avatar = req.file?.filename
  res.send(avatar)
  console.log(avatar)
})

module.exports = {
  registerUser,
}
