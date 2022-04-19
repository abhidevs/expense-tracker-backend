const AuthService = require("../services/AuthService");

exports.registerUser = async (req, res) => {
  try {
    const checkUser = await AuthService.checkIfUserExists(req.body);
    if (checkUser) {
      res.status(403).json({ message: "User already exists!", success: false });
    } else {
      const { id, name, email, phone, createdAt, updatedAt } =
        await AuthService.createUser(req.body);
      res.json({ id, name, email, phone, createdAt, updatedAt });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
