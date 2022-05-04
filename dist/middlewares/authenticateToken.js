"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwtToken_1 = require("../utils/jwtToken");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
        return res.status(401).json({ message: "Invalid token!", success: false });
    (0, jwtToken_1.verifyToken)(token)
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
exports.default = authenticateToken;
