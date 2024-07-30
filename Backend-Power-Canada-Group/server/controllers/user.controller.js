import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import errorHandler from './error.controller.js';

// Creates a new user
const create = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    hashed_password: await bcrypt.hash(req.body.password, 10)  // Ensure password is hashed
  });

  try {
    await user.save();
    const { hashed_password, ...userInfo } = user.toObject();  // Exclude the hashed_password when returning the user object
    return res.status(200).json({
      message: "Successfully signed up!",
      user: userInfo
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

// Lists all users
const list = async (req, res) => {
  try {
    const users = await User.find().select('name email updated created');  // Make sure to exclude the password from the output
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

// Middleware to load user by ID and append to req
const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    req.profile = user;  // Attach the user object to the request object for downstream use
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve user" });
  }
};

// Reads the profile from req.profile
const read = (req, res) => {
  req.profile.hashed_password = undefined; // Ensure hashed password is not leaked
  return res.json(req.profile);
};

// Updates a user
const update = async (req, res) => {
  try {
    let user = req.profile;
    if (req.body.password) {
      req.body.hashed_password = await bcrypt.hash(req.body.password, 10);
    }
    user = Object.assign(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;  // Exclude the hashed password from the output
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

// Removes a user
const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.remove();
    deletedUser.hashed_password = undefined;  // Make sure to exclude the password from the output
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

export { create, list, read, remove, update, userByID };

