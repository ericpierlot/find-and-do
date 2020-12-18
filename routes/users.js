const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const User = require('../models/User.js');
const Message = require('../models/Message.js');

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

    const { email, password, firstName, lastName, birthdate } = req.body;
    const { days, months, years } = birthdate;
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

      try {
        const userAdmin = await User.find({ isAdmin: { $eq: true } })
          .sort({ createdAt: -1 })
          .select('firstName');
        console.log('userAdmin: ', userAdmin);
        console.log('id admin: ', userAdmin[0]._id);
        const message = new Message({
          message: {
            text: `${user.firstName}, nous vous souhaitons la bienvenue sur Find & Do.`,
          },
          recipient: user.id,
          sender: userAdmin[0]._id,
        });
        console.log('message : ', message);
        message.save();
      } catch (error) {
        res.status(500).send('Erreur du message de bienvenue', err);
      }

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
      res.status(500).send('Error from Server', error);
    }
  }
);

// @route     GET api/users/:id
// @desc      Get profile by id
// @access    Private

router.get('/profil/:id', async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.id })
      .select('-password')
      .select('-email');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send('Error to reach the server', error);
  }
});

// @route     GET api/users/experience/:id
// @desc      Update an user
// @access    Private

router.get('/experience/:id', async (req, res) => {
  try {
    const author = await User.find({ experienceCreated: [req.params.id] });
    res.json({ author });
  } catch (error) {
    res.status(500).send('Error to reach the server');
  }
});

router.post('/message', auth, async (req, res) => {
  try {
    const userFirstName = await User.findById({ _id: req.body.data }).select(
      'firstName'
    );
    res.status(200).json(userFirstName);
  } catch (error) {
    res.status(401).json({ message: error });
  }
});
// @route     PUT api/users/:id
// @desc      Update an user
// @access    Private

router.put('/:id', auth, async (req, res) => {
  //Destructuring
  const { firstName, lastName, birthdate } = req.body;
  const { days, months, years } = birthdate;

  try {
    await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          firstName,
          lastName,
          birthdate: {
            days,
            months,
            years,
          },
        },
      }
    );
    res.json({ firstName, lastName, birthdate });
  } catch (error) {
    res.status(500).send('Error to reach the server');
    console.error(error.message);
  }
});

// @route     PUT api/users/:id/email
// @desc      Update email of the user
// @access    Private

router.put('/:id/email', auth, async (req, res) => {
  const { email } = req.body;

  try {
    const emailAlreadyExist = await User.findOne({ email });

    if (emailAlreadyExist) {
      return res.status(400).json({ message: 'Email already exist' });
    }

    await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          email,
        },
      }
    );

    res.json({ email });
  } catch (error) {
    res.status(500).send('Error to reach the server');
    console.error(error.message);
  }
});

// @route     PUT api/users/:id
// @desc      Modify Password only
// @access    Private

router.put('/:id/updatePassword', auth, async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  try {
    const user = await User.findById(req.params.id);

    const isMatch = await bcrypt.compare(req.body.actual, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Actual password is wrong' });
    }

    await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          password: req.body.password,
        },
      }
    );

    res.json({ message: 'success' });
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

// Selecter tout les utilisateurs du site
router.get('/admin/all', admin, async (req, res) => {
  //const currentPage = req.query.page || 1;
  const { page } = req.query || 1;
  const perPage = 5;
  let totalUsers;
  try {
    await User.find({})
      .sort({ createdAt: -1 })
      .countDocuments()
      .then((count) => {
        totalUsers = count;
        return User.find({})
          .skip((page - 1) * perPage)
          .limit(perPage);
      })
      .then((users) => {
        res.status(200).json({ users: users, totalUsers: totalUsers });
      })
      .catch((err) => res.status(500).send('Error from Server', err));
  } catch (err) {
    res.status(500).send('Error from Server', err);
  }
});

// Bannir un compte utilisateur
router.put('/admin/ban/:id', admin, async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;
  try {
    await User.findByIdAndUpdate({ _id: id }, { $set: { hasAccess: !state } });

    res.status(200).send('Les modifications ont bien été enregistrées');
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
