const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

// MIDDLEWARES
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    allowedHeaders: "*",
    withCredentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static("uploads"));
app.use(bodyParser.json());

// ROUTES
app.use("/api/user", userRoutes);

app.use(errorHandler);
// CREATE SERVER AND CONNECT TO THE DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
