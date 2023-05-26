const jwt = require('jsonwebtoken')

export const createToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '5m' })
}
