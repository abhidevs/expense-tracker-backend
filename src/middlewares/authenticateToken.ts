import { verifyToken } from "../utils/jwtToken";
import { NextFunction, Request, Response } from "express";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({ message: "Invalid token!", success: false });

  verifyToken(token)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(403)
        .json({ message: "Invalid token!", success: false });
    });
};

export default authenticateToken;
