const jwt = require('jsonwebtoken');
require('dotenv').config();
// Loads the environment variables present in .env

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // Check if JSON Web Token exists and is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/');
  }
};

// Check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        next();
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {

  }
}

module.exports = { requireAuth };
