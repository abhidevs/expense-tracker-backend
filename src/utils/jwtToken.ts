import jwt from "jsonwebtoken";

export const generateAccessToken = (user: any) => {
  return jwt.sign(user, process.env.TOKEN_SECRET as string, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.TOKEN_SECRET as string,
      (err: any, user: any) => {
        if (err) reject(err);
        else resolve(user);
      }
    );
  });
};
