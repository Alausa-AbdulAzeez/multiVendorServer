const asyncHandler = require('express-async-handler')

// REGISTER USER
const registerUser = asyncHandler(async (req, res) => {
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

  if (!name || !email || !password) {
    res.status(401)
    throw new Error('Pleae fill in the required info')
  }

  if (password?.length < 4) {
    res.status(400)
    throw new Error('Password can not be less that four(4) letters')
  }
})

module.exports = {
  registerUser,
}
