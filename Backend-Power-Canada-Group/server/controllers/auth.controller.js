import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config/config.js';
import User from '../models/user.model.js';

const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      // If user not found, return a user not found message
      return res.status('401').json({ error: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    if (!await bcrypt.compare(req.body.password, user.hashed_password)) {
      // If passwords do not match, return a wrong password message
      return res.status('401').json({ error: "Wrong password" });
    }

    // If passwords match, create a token
    const token = jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: '1d' });

    // Set a cookie with the token
    res.cookie('t', token, { expire: new Date() + 9999 });

    // Return a success message with user info, but exclude the password
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
    // General error handling
    return res.status('500').json({ error: "API error during signin" });
  }
};

export { signin };

