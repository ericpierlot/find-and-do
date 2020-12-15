"use strict";

var express = require('express');

var router = express.Router();

var _require = require('express-validator'),
    body = _require.body,
    validationResult = _require.validationResult;

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var config = require('config');

var User = require('../models/User');

var auth = require('../middlewares/auth'); // @route     GET api/auth
// @desc      Get an user logged
// @access    Private


router.get('/', auth, function _callee(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user.id).select('-password'));

        case 3:
          user = _context.sent;
          res.json(user);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0.message);
          res.status(500).send('Server error');

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // @route     POST api/auth
// @desc      Auth user & give token
// @access    Public

router.post('/', [// Simple check with Express-validator module
body('email', 'Please insert a valid email').isEmail(), body('password', 'Password must be more than 6 characters').isLength({
  min: 6,
  max: 255
})], function _callee2(req, res) {
  var errors, _req$body, email, password, user, isMatch, payload;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // Check valid Email & Password input
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          // Declare only email & password for Auth process
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context2.prev = 4;
          _context2.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 7:
          user = _context2.sent;

          if (user) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'Email not found'
          }));

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 12:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'Password not match'
          }));

        case 15:
          if (!(!user.hasAccess && !user.isAdmin)) {
            _context2.next = 17;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            message: 'Banni'
          }));

        case 17:
          // Using payload to use in jwt We want only ID of user, anything else
          payload = {
            user: {
              id: user.id
            }
          }; // Give JWT Token

          jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 36000
          }, function (error, token) {
            if (error) throw error;
            res.json({
              token: token
            });
          });
          _context2.next = 25;
          break;

        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2["catch"](4);
          console.error(_context2.t0.message);
          res.status(500).send('Internal error');

        case 25:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 21]]);
});
module.exports = router;