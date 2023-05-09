const express = require('express')
const dotenv = require('dotenv')
const { default: mongoose } = require('mongoose')

const app = express()
const PORT = process.env.PORT || 5000
dotenv.config()

// MIDDLEWARES
app.use(express.json())

// ROUTES
app.get('/', (req, res) => {
  res.send('hello')
})

// CREATE SERVER AND CONNECT TO THE DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
