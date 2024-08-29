const { getUserByEmail, createUser, login } = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const WEBTOKEN_MAX_AGE = 3 * 24 * 60 * 60; // 3 days

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: WEBTOKEN_MAX_AGE
  });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required!" });
  }

  if (!email) {
    return res.status(400).json({ error: "Email is required!" });
  }

  if (!password) {
    return res.status(400).json({ error: "Password is required!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return res.status(400).json({
      error: "This email is already being used!"
    });
  }

  try {
    const user = await createUser(name, email, hashedPassword);
    const token = createToken(user.insertId);
    res.cookie('jwt', token, {
      httpOnly: true, maxAge: WEBTOKEN_MAX_AGE * 1000
    });

    return res.status(200).json({ user: user.insertId });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required!" });
  }

  if (!password) {
    return res.status(400).json({ error: "Password is required!" });
  }

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      throw Error('This user does not exist!');
    }

    const auth = await bcrypt.compare(password, user.password_hash);

    if (!auth) {
      throw Error('Password is Wrong!');
    }

    const token = createToken(user.id);
    res.cookie('jwt', token, {
      httpOnly: true, maxAge: WEBTOKEN_MAX_AGE * 1000
    });

    res.status(200).json({ user: user.id });

  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

// Remove token value to logout user
exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.redirect('/')
}