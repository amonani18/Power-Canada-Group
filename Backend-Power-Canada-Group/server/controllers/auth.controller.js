import bcrypt from 'bcryptjs';
import { expressjwt } from 'express-jwt'; // Importing the express-jwt for JWT authentication middleware
import jwt from 'jsonwebtoken';
import config from '../../config/config.js';
import User from '../models/user.model.js';

const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status('401').json({ error: "User not found" });
    }

    if (!await bcrypt.compare(req.body.password, user.hashed_password)) {
      return res.status('401').json({ error: "Wrong password" });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: '1d' });
    res.cookie('t', token, { expire: new Date() + 9999 });

    return res.json({
      message: "Welcome " + user.name + "!",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
    });
  } catch (err) {
    return res.status('500').json({ error: "API error during signin" });
  }
};

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id.toString() === req.auth._id;
  if (!authorized) {
    return res.status(403).json({ error: "User is not authorized" });
  }
  next();
};

const requireSignin = expressjwt({ // Define the middleware for JWT verification
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth"
});

export { hasAuthorization, requireSignin, signin }; // Ensure to export all necessary functions

