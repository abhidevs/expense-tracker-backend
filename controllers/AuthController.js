const AuthService = require("../services/AuthService");
const UserService = require("../services/UserService");
const { comparePassword } = require("../utils/encryptPass");
const { generateAccessToken } = require("../utils/jwtToken");

exports.registerUser = async (req, res) => {
  try {
    const checkUser = await UserService.checkIfUserExists(req.body);
    if (checkUser) {
      res.status(403).json({ message: "User already exists!", success: false });
    } else {
      await AuthService.createUser(req.body);
      res.status(201).json({
        message: "Signed up successfully. Please login.",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const checkUser = await UserService.checkIfUserExists(req.body);
    if (checkUser) {
      const match = await comparePassword(
        req.body.password,
        checkUser.password
      );
      if (match) {
        const token = generateAccessToken({
          id: checkUser.id,
          name: checkUser.name,
          email: checkUser.email,
        });
        res.json({ accessToken: token, isPremiumMember: checkUser.isPremiumMember });
      } else {
        res.status(401).json({ message: "Wrong password!", success: false });
      }
    } else {
      res.status(404).json({ message: "User not found!", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
