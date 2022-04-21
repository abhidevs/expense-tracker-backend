const jwt = require("jsonwebtoken");
const { verifyToken } = require("../utils/jwtToken");

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res
      .status(401)
      .json({ message: "Invalid token!", success: false });

  const { err, user } = verifyToken(token);
//   console.log({ err, user });

  if (err)
    return res
      .status(403)
      .json({ message: "Invalid token!", success: false });

  req.user = user;
  next();
};
