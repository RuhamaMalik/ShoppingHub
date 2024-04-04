const jwt = require("jsonwebtoken");
const JSON_SECRET = 'nbd=wh+jm#rgmsfwj%-fkjk90(e][je$bdjwe';
const db = require('../models/config')
const User = db.users;

const authmiddleware = async (req, res, next) => {
  try {
    const token = req.headers.token
    // const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        message: "Auth Failed: Token not provided",
        success: false,
      });
    }

    jwt.verify(token, JSON_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          message: "Auth Failed: Invalid token",
          success: false,
        });
      } else {
        req.body.id = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
}; 

const adminmiddleware = async (req, res, next) => {
  // console.log(req.body.isAdmin);
  // if (!req.body.isAdmin) {
  //   return res.status(403).send({message:'Only admin users can access this resource'});
  // }

  const user = await User.findOne({
    where: {
      id: req.body.id
    }
  });
  if (!user) {
    return res.status(404).send({ message: "User not found", success: false });
  }
  if (!user.isAdmin) {
    return res.status(403).send({ message: 'Only admin users can access this resource' , success: false });
  }

  next();
};


module.exports = {
  authmiddleware,
  adminmiddleware
}


