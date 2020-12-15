const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');
const auth = require('../middlewares/auth');

// @route     GET api/auth
// @desc      Get an user logged
// @access    Private

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/auth
// @desc      Auth user & give token
// @access    Public

router.post(
  '/',
  [
    // Simple check with Express-validator module
    body('email', 'Please insert a valid email').isEmail(),
    body('password', 'Password must be more than 6 characters').isLength({
      min: 6,
      max: 255,
    }),
  ],
  async (req, res) => {
    // Check valid Email & Password input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Declare only email & password for Auth process
    const { email, password } = req.body;

    try {
      // Find if this Email exists in my DB.
      const user = await User.findOne({ email });

      // If there is not this Email in my DB -> Error.
      if (!user) {
        return res.status(400).json({ message: 'Email not found' });
      }
      //If there is we can now check the password (Using Bcrypt because password already Hash'd)
      const isMatch = await bcrypt.compare(password, user.password);
      //Check if password match or not
      if (!isMatch) {
        return res.status(400).json({ message: 'Password not match' });
      }

      // Vérification si l'utilisateur a accès au site (banni ou pas)
      if (!user.hasAccess && !user.isAdmin)
        return res.status(401).json({ message: 'Banni' });

      // Using payload to use in jwt We want only ID of user, anything else
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Give JWT Token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 36000,
        },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal error');
    }
  }
);

module.exports = router;
