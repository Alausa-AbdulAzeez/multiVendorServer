// REGISTER USER
const registerUser = async (req, res) => {
  try {
    // const { name, emaail } = req.body;
    res.send("register user");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
};
