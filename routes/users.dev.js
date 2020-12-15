"use strict";

var express = require('express');

var router = express.Router();

var _require = require('express-validator'),
    body = _require.body,
    validationResult = _require.validationResult;

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var config = require('config');

var auth = require('../middlewares/auth');

var admin = require('../middlewares/admin');

var User = require('../models/User.js'); // @route     POST api/users
// @desc      Register a user
// @access    Public


router.post('/', [body('email', 'Please insert a valid email').isEmail(), body('password', 'Password must be longer than 6 characters').isLength({
  min: 6,
  max: 255
}), body('firstName', 'Firstname must be not empty').not().isEmpty()], function _callee(req, res) {
  var errors, _req$body, email, password, firstName, lastName, birthdate, days, months, years, emailAlreadyExist, user, salt, payload;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _req$body = req.body, email = _req$body.email, password = _req$body.password, firstName = _req$body.firstName, lastName = _req$body.lastName, birthdate = _req$body.birthdate;
          days = birthdate.days, months = birthdate.months, years = birthdate.years;
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 8:
          emailAlreadyExist = _context.sent;

          if (!emailAlreadyExist) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Email already exists'
          }));

        case 11:
          user = new User({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            birthdate: {
              days: days,
              months: months,
              years: years
            }
          });
          _context.next = 14;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 14:
          salt = _context.sent;
          _context.next = 17;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 17:
          user.password = _context.sent;
          _context.next = 20;
          return regeneratorRuntime.awrap(user.save());

        case 20:
          payload = {
            user: {
              id: user.id
            }
          };
          jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600
          }, function (error, token) {
            if (error) throw error;
            res.json({
              token: token
            });
          });
          _context.next = 27;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](5);
          // console.error(error.message);
          res.status(500).send('Error from Server', _context.t0);

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 24]]);
}); // @route     GET api/users/:id
// @desc      Get profile by id
// @access    Private

router.get('/profil/:id', function _callee2(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.find({
            _id: req.params.id
          }).select('-password').select('-email'));

        case 3:
          user = _context2.sent;
          res.status(200).json(user);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).send('Error to reach the server', _context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // @route     GET api/users/experience/:id
// @desc      Update an user
// @access    Private

router.get('/experience/:id', function _callee3(req, res) {
  var author;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.find({
            experienceCreated: [req.params.id]
          }));

        case 3:
          author = _context3.sent;
          res.json({
            author: author
          });
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(500).send('Error to reach the server');

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.post('/message', auth, function _callee4(req, res) {
  var userFirstName;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.findById({
            _id: req.body.data
          }).select('firstName'));

        case 3:
          userFirstName = _context4.sent;
          res.status(200).json(userFirstName);
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(401).json({
            message: _context4.t0
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // @route     PUT api/users/:id
// @desc      Update an user
// @access    Private

router.put('/:id', auth, function _callee5(req, res) {
  var _req$body2, firstName, lastName, birthdate, days, months, years;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          //Destructuring
          _req$body2 = req.body, firstName = _req$body2.firstName, lastName = _req$body2.lastName, birthdate = _req$body2.birthdate;
          days = birthdate.days, months = birthdate.months, years = birthdate.years;
          _context5.prev = 2;
          _context5.next = 5;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate({
            _id: req.params.id
          }, {
            $set: {
              firstName: firstName,
              lastName: lastName,
              birthdate: {
                days: days,
                months: months,
                years: years
              }
            }
          }));

        case 5:
          res.json({
            firstName: firstName,
            lastName: lastName,
            birthdate: birthdate
          });
          _context5.next = 12;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](2);
          res.status(500).send('Error to reach the server');
          console.error(_context5.t0.message);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 8]]);
}); // @route     PUT api/users/:id/email
// @desc      Update email of the user
// @access    Private

router.put('/:id/email', auth, function _callee6(req, res) {
  var email, emailAlreadyExist;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          email = req.body.email;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          emailAlreadyExist = _context6.sent;

          if (!emailAlreadyExist) {
            _context6.next = 7;
            break;
          }

          return _context6.abrupt("return", res.status(400).json({
            message: 'Email already exist'
          }));

        case 7:
          _context6.next = 9;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate({
            _id: req.params.id
          }, {
            $set: {
              email: email
            }
          }));

        case 9:
          res.json({
            email: email
          });
          _context6.next = 16;
          break;

        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](1);
          res.status(500).send('Error to reach the server');
          console.error(_context6.t0.message);

        case 16:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 12]]);
}); // @route     PUT api/users/:id
// @desc      Modify Password only
// @access    Private

router.put('/:id/updatePassword', auth, function _callee7(req, res) {
  var salt, user, isMatch;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 2:
          salt = _context7.sent;
          _context7.next = 5;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, salt));

        case 5:
          req.body.password = _context7.sent;
          _context7.prev = 6;
          _context7.next = 9;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 9:
          user = _context7.sent;
          _context7.next = 12;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.actual, user.password));

        case 12:
          isMatch = _context7.sent;

          if (isMatch) {
            _context7.next = 15;
            break;
          }

          return _context7.abrupt("return", res.status(400).json({
            message: 'Actual password is wrong'
          }));

        case 15:
          _context7.next = 17;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate({
            _id: req.params.id
          }, {
            $set: {
              password: req.body.password
            }
          }));

        case 17:
          res.json({
            message: 'success'
          });
          _context7.next = 23;
          break;

        case 20:
          _context7.prev = 20;
          _context7.t0 = _context7["catch"](6);
          res.status(500).send('Error to reach the server');

        case 23:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[6, 20]]);
}); // @route     DELETE api/users/:id
// @desc      Delete an user
// @access    Private

router["delete"]('/:id', function (req, res) {
  res.send('Delete an user');
}); // Selecter tout les utilisateurs du site

router.get('/admin/all', admin, function _callee8(req, res) {
  var allUsers;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(User.find({}).sort({
            updatedAt: -1
          }));

        case 3:
          allUsers = _context8.sent;
          res.status(200).send(allUsers);
          _context8.next = 10;
          break;

        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          res.status(500).send('Error from Server', _context8.t0);

        case 10:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Bannir un compte utilisateur

router.put('/admin/ban/:id', admin, function _callee9(req, res) {
  var id, state;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          id = req.params.id;
          state = req.body.state;
          _context9.prev = 2;
          _context9.next = 5;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate({
            _id: id
          }, {
            $set: {
              hasAccess: !state
            }
          }));

        case 5:
          res.status(200).send('Les modifications ont bien été enregistrées');
          _context9.next = 11;
          break;

        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](2);
          res.status(500).send(_context9.t0);

        case 11:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[2, 8]]);
});
module.exports = router;