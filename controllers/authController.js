const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register API
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).json({
        message: "User Already Exits",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    //res data
    const user = await new userModel(req.body);
    await user.save();
    return res.status(200).send({
      success: true,
      message: "User Created Succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "User Registred Successfully",
      error,
    });
  }
};

//login API
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).send({
        success: false,
        message: "User Not Valid",
        error,
      });
    }
    const comparePassword = await bcrypt.compare(req.body.password, user.password);
    if (!comparePassword) {
      res.status(500).send({
        success: false,
        message: "Invalid password",
      });
    }
    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).send({
      success: false,
      message: "Error in login API",
      error,
      user,
    });
  } catch (error) {
    if (error) {
      res.status(400).send({
        success: false,
        message: "User not found",
        error,
      });
    }
  }
};

module.exports = { registerController, loginController };
