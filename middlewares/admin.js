const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  // Get token from header to check later
  const token = req.header('x-auth-token');

  //Check if token exists if not then return error
  if (!token)
    return res.status(401).json({ message: 'No token, access denied' });

  // Token was find then we check if token is valid
  try {
    const decodedToken = jwt.verify(token, config.get('jwtSecret'));
    req.user = decodedToken.user;

    // check if he is admin
    const user = await User.findById(req.user.id);
    if (!user.isAdmin)
      return res.status(400).json({ message: 'Access declined' });
    next();

    // If not valid error
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
