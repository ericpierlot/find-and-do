"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

var Experience = require('../models/Experience.js');

var User = require('../models/User');

var Message = require('../models/Message');

router.post('/read', auth, function _callee(req, res) {
  var id, NumberMessageUnread;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = req.user.id;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(Message.find({
            $and: [{
              recipient: {
                $in: id
              }
            }, {
              read: {
                $eq: false
              }
            }]
          }).select('read'));

        case 4:
          NumberMessageUnread = _context.sent;
          res.status(200).send(NumberMessageUnread);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          res.status(500).send(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // @route GET api/messages/
// @desc  Check if have a message
// @access Private

router.post('/', auth, function _callee3(req, res) {
  var id, userRecipient;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.user.id;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Message.find({
            recipient: {
              $in: id
            }
          }).lean().sort({
            createdAt: -1
          }));

        case 4:
          userRecipient = _context3.sent;
          userRecipient.map(function _callee2(item) {
            var _id, read;

            return regeneratorRuntime.async(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _id = item._id, read = item.read;

                    if (!(read === true)) {
                      _context2.next = 3;
                      break;
                    }

                    return _context2.abrupt("return", item);

                  case 3:
                    _context2.next = 5;
                    return regeneratorRuntime.awrap(Message.findByIdAndUpdate(_id, {
                      $set: {
                        read: true
                      }
                    }));

                  case 5:
                    return _context2.abrupt("return", _context2.sent);

                  case 6:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          });
          _context3.next = 8;
          return regeneratorRuntime.awrap(Promise.all(userRecipient.map(function (item) {
            var senderFirstName = User.find({
              _id: {
                $in: item.sender
              }
            }).select('firstName').select('-_id').then(function (result) {
              var content = result.map(function (res) {
                return res.firstName;
              });
              item.senderFirstName = content;
              return content;
            });
            return senderFirstName;
          })).then(function () {
            if (userRecipient.length > 0) {
              return res.status(200).send(_toConsumableArray(userRecipient));
            }

            if (userRecipient.length === 0) {
              return res.status(200).json(0);
            }
          })["catch"](function () {
            return res.status(500).json({
              message: 'Une erreur est survenue lors de la recherche'
            });
          }));

        case 8:
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);
          res.status(401).json({
            message: 'Une erreur est survenue lors de la recherche'
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 10]]);
});
router["delete"]('/delete', auth, function _callee4(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.query.id;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Message.findOneAndDelete({
            _id: id
          }));

        case 4:
          res.status(200).json('success');
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](1);
          res.status(401).json({
            message: _context4.t0
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 7]]);
});
router.post('/sended', auth, function _callee5(req, res) {
  var id, userSender;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          //const { id } = req.user;
          id = req.user.id;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Message.find({
            sender: {
              $in: id
            }
          }).lean().sort({
            updatedAt: -1
          }).limit(20));

        case 4:
          userSender = _context5.sent;
          _context5.next = 7;
          return regeneratorRuntime.awrap(Promise.all(userSender.map(function (item) {
            var recipientFirstName = User.find({
              _id: {
                $in: item.recipient
              }
            }).select('firstName').select('-_id').then(function (result) {
              var content = result.map(function (res) {
                return res.firstName;
              });
              item.recipientFirstName = content;
              return content;
            });
            return recipientFirstName;
          })).then(function () {
            if (userSender.length > 0) {
              return res.status(200).send(_toConsumableArray(userSender));
            }

            if (userSender.length === 0) {
              return res.status(200).json(0);
            }
          })["catch"](function () {
            return res.status(401).json({
              message: 'Une erreur est survenue lors de la recherche'
            });
          }));

        case 7:
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](1);
          res.status(401).json({
            message: 'Une erreur est survenue lors de la recherche'
          });

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 9]]);
}); // @route POST api/messages/
// @desc  Send a message
// @access Private

router.post('/send', auth, [body('messageToSend', 'Message must be longer than 20 characters, maximum of 650 characters').isLength({
  min: 20,
  max: 650
})], function _callee6(req, res) {
  var errors, _req$body, messageToSend, recipientID, sendUserID, message;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context6.next = 3;
            break;
          }

          return _context6.abrupt("return", res.status(500).json({
            errors: errors.array()
          }));

        case 3:
          _req$body = req.body, messageToSend = _req$body.messageToSend, recipientID = _req$body.recipientID, sendUserID = _req$body.sendUserID;

          try {
            message = new Message({
              message: {
                text: messageToSend
              },
              recipient: recipientID,
              sender: sendUserID
            });
            message.save();
            res.json({
              message: 'Message has been sended'
            });
          } catch (error) {
            console.error('err', error);
          }

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
});
module.exports = router;