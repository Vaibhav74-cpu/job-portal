//middleware is work between req and res . and
// Middleware = code that checks or prepares something before your main logic runs.
// JWT = digital id card, a secure way to check if the user is logged in and who they are.
import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: " user is not authenticated",
        success: false,
      });
    }

    //if token is exist or authenticated so we convert into decode
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "invalid token",
        success: false,
      });
    }

    //if token is decoded , means we give some information
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};
export default isAuthenticated;
