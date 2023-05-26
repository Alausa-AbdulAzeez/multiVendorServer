const express = require('express')
const { registerUser } = require('../controllers/userController')
const upload = require('../miscellaneous/multer')

const router = express.Router()

// REGISTER USER
router.post('/register', upload.single('file'), registerUser)

// ACTIVATE USER
router.post('/activate')

module.exports = router
