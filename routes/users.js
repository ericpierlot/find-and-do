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

router.get('/allDB', async (req, res) => {
  try {
    // maybe for admin purpose ?
    res.send('get all users from my DB collection users');
  } catch (error) {
    console.error(error.message);
  }
});

// @route     PUT api/users/:id
// @desc      Update an user
// @access    Private

router.put('/:id', async (req, res) => {
  // res.send('Update an user');
  // console.log(req.body);
  try {
    const profil = await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          birthdate: {
            days: req.body.birthdate.days,
            months: req.body.birthdate.months,
            years: req.body.birthdate.years,
          },
        },
      }
    );
    res.json({ profil });
  } catch (error) {
    res.status(500).send('Error to reach the server');
    console.error(error.message);
  }
});

// @route     PUT api/users/:id
// @desc      Modify Password only
// @access    Private

router.put('/:id/updatePassword', async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  try {
    const user = await User.findById(req.params.id);

    const isMatch = await bcrypt.compare(req.body.actual, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Actual password is wrong' });
    }

    const profil = await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          password: req.body.password,
        },
      }
    );

    res.json({ profil });
  } catch (error) {
    res.status(500).send('Error to reach the server');
  }
});

// @route     DELETE api/users/:id
// @desc      Delete an user
// @access    Private

router.delete('/:id', (req, res) => {
  res.send('Delete an user');
});

module.exports = router;
