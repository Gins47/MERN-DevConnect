const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {

    console.log("Inside middleware") 
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({ msg: " No auth token found " });
  }

  try {
    jwt.verify(token, config.get("JWTSecret"), (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "Token not valid" });
      } else {
          console.log(`Decode = ${JSON.stringify(decoded)}`)
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware",err);
    res.status(500).json({ msg: "Server Error" });
  }
};
