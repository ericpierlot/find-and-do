const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = require('../middlewares/auth');

const User = require('../models/User.js');

// @route     POST api/users
// @desc      Register a user
// @access    Public
router.post(
  '/',
  [
    body('email', 'Please insert a valid email').isEmail(),
    body('password', 'Password must be longer than 6 characters').isLength({
      min: 6,
      max: 255,
    }),
    body('firstName', 'Firstname must be not empty').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName, city, birthdate } = req.body;
    const { days, months, years } = req.body.birthdate;
    try {
      const emailAlreadyExist = await User.findOne({ email });

      if (emailAlreadyExist) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const user = new User({
        email,
        password,
        firstName,
        lastName,
        city,
        birthdate: {
          days,
          months,
          years,
        },
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600,
        },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      // console.error(error.message);
      res.status(500).send('Error from Server');
    }
  }
);

// @route     GET api/users/:id
// @desc      Get profile by id
// @access    Private

router.get('/:id', async (req, res) => {
  try {
    const profile = await User.find({ _id: req.params.id });
    // console.log(req.params.id);
    const {
      email,
      firstName,
      lastName,
      birthdate,
      experienceCreated,
    } = profile[0];
    res.json({
      email,
      firstName,
      lastName,
      birthdate,
      experienceCreated,
    });
  } catch (error) {
    console.error(error.message);
  }
});

// @route     GET api/users/profile
// @desc      User will be able to see his profile
// @access    Private

// router.get('/profile', auth, async (req, res) => {
//   try {
//     const profile = await User.find({ _id: req.user.id });
//     const {
//       email,
//       firstName,
//       lastName,
//       birthdate,
//       experienceCreated,
//     } = profile[0];
//     res.json({
//       email,
//       firstName,
//       lastName,
//       birthdate,
//       experienceCreated,
//     });
//   } catch (error) {
//     console.error(error.message);
//   }
// });

// @route     PUT api/users/:id
// @desc      Update an user
// @access    Private

router.put('/:id', async (req, res) => {
  // res.send('Update an user');
  console.log(req.body);
  try {
    const profile = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { firstName: req.body.firstName, lastName: req.body.lastName } }
    );
    const { email, firstName, lastName, birthdate } = profile;
    res.send({
      email,
      firstName,
      lastName,
      birthdate,
    });
  } catch (error) {
    res.status(500).send('Error to reach the server');
    console.error(error.message);
  }
});

// @route     DELETE api/users/:id
// @desc      Delete an user
// @access    Private

router.delete('/:id', (req, res) => {
  res.send('Delete an user');
});

module.exports = router;
