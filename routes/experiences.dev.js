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

var Experience = require('../models/Experience.js');

var User = require('../models/User'); // @route     GET api/experiences/myexperience
// @desc      Get Experience by user ID
// @access    Private


router.get('/myexperience', auth, function _callee(req, res) {
  var userExperience;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Experience.find({
            createdBy: req.query.id
          }));

        case 3:
          userExperience = _context.sent;
          res.status(200).json(userExperience);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(401).json({
            message: 'Une erreur est survenue lors de la recherche'
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.get('/allcity', function _callee2(req, res) {
  var allCities;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Experience.find({}).select('lieu').select('-_id'));

        case 3:
          allCities = _context2.sent;
          res.status(200).json(allCities);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(401).json({
            message: 'Une erreur est survenue lors de la recherche'
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router["delete"]('/delete', auth, function _callee3(req, res) {
  var UserByExpID;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.findById({
            _id: req.user.id
          }));

        case 3:
          UserByExpID = _context3.sent;

          if (!(UserByExpID.experienceCreated.length === 0)) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: 'User have no experienceCreated'
          }));

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(UserByExpID.experienceCreated.pop());

        case 8:
          _context3.next = 10;
          return regeneratorRuntime.awrap(UserByExpID.save());

        case 10:
          _context3.next = 12;
          return regeneratorRuntime.awrap(Experience.deleteMany({
            createdBy: UserByExpID.id
          }));

        case 12:
          //Everything was fine :
          res.status(200).json({
            message: 'Experience removed from the User collection & Remove from Experience collection.'
          });
          _context3.next = 18;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](0);
          res.status(401).json({
            errors: _context3.t0
          });

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 15]]);
}); // @route GET api/expriences/:id
// @desc  Get Experience by exp ID
// @access Private

router.get('/id/:id', function _callee4(req, res) {
  var readThisExperience;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Experience.findById({
            _id: req.params.id
          }));

        case 3:
          readThisExperience = _context4.sent;
          res.status(200).json(readThisExperience);
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0.message);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // @route     GET api/experiences/:city
// @desc      Get an Experience by city
// @access    Private

router.post('/city/:lieu', function _callee5(req, res) {
  var experienceCity;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Experience.find({
            lieu: req.query.lieu
          }));

        case 3:
          experienceCity = _context5.sent;

          if (!(experienceCity.length === 0)) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(401).json({
            message: 'No experiences found'
          }));

        case 6:
          res.status(200).json(experienceCity);
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          res.status(500).send('Error from Server', _context5.t0);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // @route     POST api/experiences
// @desc      Register an Experience
// @access    Private

router.post('/', [auth, [body('title', 'Title must have minimum 2 and max 40 caracters').isLength({
  min: 2,
  max: 40
}), body('programme', 'Programme can not be empty').not().isEmpty(), body('lieu', 'A city is required').not().isEmpty(), body('exactAddress', 'An address is required').not().isEmpty(), body('aboutYou', 'About you must be defined').not().isEmpty(), body('type', 'Type must be defined').not().isEmpty()]], function _callee6(req, res) {
  var errors, _req$body, title, photos, lieu, exactAddress, theme, type, aboutYou, programme, precision, category, experience, updateUser;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context6.next = 3;
            break;
          }

          return _context6.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _req$body = req.body, title = _req$body.title, photos = _req$body.photos, lieu = _req$body.lieu, exactAddress = _req$body.exactAddress, theme = _req$body.theme, type = _req$body.type, aboutYou = _req$body.aboutYou, programme = _req$body.programme;
          precision = theme.precision, category = theme.category;
          _context6.prev = 5;
          //Create experience in DB
          experience = new Experience({
            title: title,
            photos: photos,
            lieu: lieu,
            exactAddress: exactAddress,
            category: category,
            type: type,
            precision: precision,
            aboutYou: aboutYou,
            programme: programme,
            createdBy: req.user.id
          }); // Update the owner of this experience created and add it to his [experienceCreated]
          // Simple check if user exist

          _context6.next = 9;
          return regeneratorRuntime.awrap(User.findById({
            _id: req.user.id
          }));

        case 9:
          updateUser = _context6.sent;

          if (updateUser) {
            _context6.next = 12;
            break;
          }

          return _context6.abrupt("return", res.status(401).json({
            message: 'User not found'
          }));

        case 12:
          if (!(updateUser.experienceCreated.length > 0)) {
            _context6.next = 14;
            break;
          }

          return _context6.abrupt("return", res.status(401).send('You already have created an experience'));

        case 14:
          _context6.next = 16;
          return regeneratorRuntime.awrap(updateUser.experienceCreated.push(experience.id));

        case 16:
          _context6.next = 18;
          return regeneratorRuntime.awrap(updateUser.save());

        case 18:
          _context6.next = 20;
          return regeneratorRuntime.awrap(experience.save());

        case 20:
          // Everything looks fine then :
          res.json({
            message: 'Experience pushed to the User & experience created successfully'
          });
          _context6.next = 26;
          break;

        case 23:
          _context6.prev = 23;
          _context6.t0 = _context6["catch"](5);
          res.status(500).send('Error from Server', _context6.t0);

        case 26:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[5, 23]]);
}); // @route     PUT api/experiences/deleteAll
// @desc      Update an experience
// @access    Private
//////////////////// DEVELOPMENT PURPOSE SET ALL EXPERIENCE TO deleteRequested : true,
//TO BE ABLE TO RESET USER
//& EXPERIENCE
// Quickly :)

/* ADMIN */
// Obtenir une liste de toutes les expériences.

router.get('/admin/all', admin, function _callee7(req, res) {
  var AllExperiences;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(Experience.find({}).sort({
            updatedAt: -1
          }));

        case 3:
          AllExperiences = _context7.sent;
          res.status(200).send(AllExperiences);
          _context7.next = 10;
          break;

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          res.status(500).send('Error from Server', _context7.t0);

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Supprimer l'expérience sélectionnée

router["delete"]('/admin/delete', admin, function _callee8(req, res) {
  var _req$params, experienceID, userID, selectAuthor;

  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _req$params = req.params, experienceID = _req$params.experienceID, userID = _req$params.userID;
          _context8.prev = 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap(Experience.findOneAndDelete({
            id: experienceID
          }));

        case 4:
          _context8.next = 6;
          return regeneratorRuntime.awrap(User.findById({
            _id: userID
          }));

        case 6:
          selectAuthor = _context8.sent;

          if (!(selectAuthor.experienceCreated.length === 0)) {
            _context8.next = 9;
            break;
          }

          return _context8.abrupt("return", res.status(400).json({
            message: 'Cet utilisateur a aucune expérience'
          }));

        case 9:
          _context8.next = 11;
          return regeneratorRuntime.awrap(selectAuthor.experienceCreated.pop());

        case 11:
          _context8.next = 13;
          return regeneratorRuntime.awrap(selectAuthor.save());

        case 13:
          //Everything was fine :
          res.status(200).json({
            message: 'Expérience supprimée, cet utilisateur peut maintenant en créer une autre.'
          });
          _context8.next = 19;
          break;

        case 16:
          _context8.prev = 16;
          _context8.t0 = _context8["catch"](1);
          res.status(500).send('Error from Server', _context8.t0);

        case 19:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 16]]);
});
router.put('/admin/validated/:id', admin, function _callee9(req, res) {
  var id, state;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          id = req.params.id;
          state = req.body.state;
          _context9.prev = 2;
          _context9.next = 5;
          return regeneratorRuntime.awrap(Experience.findByIdAndUpdate({
            _id: id
          }, {
            $set: {
              validated: !state
            }
          }));

        case 5:
          res.status(200).send('Action effectuée avec succès');
          _context9.next = 11;
          break;

        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](2);
          res.status(500).send('Error from Server', _context9.t0);

        case 11:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[2, 8]]);
}); // router.put('/deleteAll', async (req, res) => {
//   const conditions = {};
//   const update = { $set: { deleteRequested: true } };
//   const options = { upsert: false };
//   try {
//     await Experience.updateMany(conditions, update, options);
//     res.json({ message: 'All experiences got set to deleteRequested : true' });
//   } catch (error) {
//     console.error(`Failed to update items: ${error}`);
//   }
// });
// @route     PUT api/experiences/clean
// @desc      Delete all experiences requested by User, only Admin
// @access    Admin
// router.delete('/clean', async (req, res) => {
//   // Declare [] of all experiences requested to be deleted
//   const ExperienceRequested = await Experience.find({ deleteRequested: true });
//   // Check if [] is empty
//   if (ExperienceRequested.length === 0)
//     return res.status(400).json({ message: 'No delete requested by Users' });
//   // Fetch the user ID from the CreateBy in each Experience
//   ExperienceRequested.map(async (experience, index) => {
//     const UserByExpID = await User.findById({ _id: experience.createdBy });
//     try {
//       //Check [] of experienceCreated by the user
//       if (UserByExpID.experienceCreated.length === 0)
//         return res
//           .status(400)
//           .json({ message: 'User have no more experienceCreated' });
//       // Delete the experienceCreated to the User & Save
//       await UserByExpID.experienceCreated.pop();
//       await UserByExpID.save();
//       // Delete all Experiences that was requested to be deleted
//       await Experience.deleteMany({ deleteRequested: true });
//     } catch (error) {
//       res.status(500).send('Error from Server');
//     }
//   });
//   //Everything was fine :
//   res.json({
//     message:
//       'Experience removed from the UserCreated & Remove from Experience collection',
//   });
// });

module.exports = router;