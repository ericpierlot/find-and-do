const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const Experience = require('../models/Experience.js');
const User = require('../models/User');

// @route     GET api/experiences/myexperience
// @desc      Get Experience by user ID
// @access    Private

router.get('/myexperience', auth, async (req, res) => {
  // When one User try to Access to his own experience quickly from his panel

  try {
    const userExperience = await Experience.find({ createdBy: req.query.id });
    res.status(200).json(userExperience);
  } catch (error) {
    res
      .status(401)
      .json({ message: 'Une erreur est survenue lors de la recherche' });
  }
});

router.get('/allcity', async (req, res) => {
  try {
    const allCities = await Experience.find({}).select('lieu').select('-_id');

    res.status(200).json(allCities);
  } catch (error) {
    res
      .status(401)
      .json({ message: 'Une erreur est survenue lors de la recherche' });
  }
});

router.delete('/delete', auth, async (req, res) => {
  try {
    // Select the User by ID
    const UserByExpID = await User.findById({
      _id: req.user.id,
    });

    //Check [] of experienceCreated by the user
    if (UserByExpID.experienceCreated.length === 0)
      return res
        .status(400)
        .json({ message: 'User have no experienceCreated' });

    // Delete the experienceCreated to the User & Save
    await UserByExpID.experienceCreated.pop();
    await UserByExpID.save();

    // Delete all Experiences that was requested to be deleted (All because testing purpose from me)
    await Experience.deleteMany({ createdBy: UserByExpID.id });

    //Everything was fine :
    res.status(200).json({
      message:
        'Experience removed from the User collection & Remove from Experience collection.',
    });
  } catch (error) {
    res.status(401).json({ errors: error });
  }
});

// @route GET api/expriences/:id
// @desc  Get Experience by exp ID
// @access Private

router.get('/id/:id', async (req, res) => {
  try {
    const readThisExperience = await Experience.findById({
      _id: req.params.id,
    });
    res.status(200).json(readThisExperience);
  } catch (err) {
    console.error(err.message);
  }
});

// @route     GET api/experiences/:city
// @desc      Get an Experience by city
// @access    Private

router.post('/city/:lieu', async (req, res) => {
  // Find experiences from one city requested by one User.
  try {
    const experienceCity = await Experience.find({ lieu: req.query.lieu });
    if (experienceCity.length === 0) {
      return res.status(401).json({ message: 'No experiences found' });
    }
    res.status(200).json(experienceCity);
  } catch (error) {
    res.status(500).send('Error from Server', error);
  }
});

// @route     POST api/experiences
// @desc      Register an Experience
// @access    Private

router.post(
  '/',
  [
    auth,
    [
      body('title', 'Title must have minimum 2 and max 40 caracters').isLength({
        min: 2,
        max: 40,
      }),
      body('programme', 'Programme can not be empty').not().isEmpty(),
      body('lieu', 'A city is required').not().isEmpty(),
      body('exactAddress', 'An address is required').not().isEmpty(),
      body('aboutYou', 'About you must be defined').not().isEmpty(),
      body('type', 'Type must be defined').not().isEmpty(),
    ],
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      photos,
      lieu,
      exactAddress,
      theme,
      type,
      aboutYou,
      programme,
    } = req.body;

    const { precision, category } = theme;
    try {
      //Create experience in DB
      const experience = new Experience({
        title,
        photos,
        lieu,
        exactAddress,
        category,
        type,
        precision,
        aboutYou,
        programme,
        createdBy: req.user.id,
      });

      // Update the owner of this experience created and add it to his [experienceCreated]
      // Simple check if user exist
      const updateUser = await User.findById({ _id: req.user.id });
      if (!updateUser) {
        return res.status(401).json({ message: 'User not found' });
      }

      //Check if Array experienceCreated is empty or no (User can only create ONE experience)
      if (updateUser.experienceCreated.length > 0)
        return res.status(401).send('You already have created an experience');

      // Push this experience to the Array [experienceCreated] of the Owner
      await updateUser.experienceCreated.push(experience.id);

      // Save User & Experience
      await updateUser.save();
      await experience.save();

      // Everything looks fine then :
      res.json({
        message:
          'Experience pushed to the User & experience created successfully',
      });
    } catch (error) {
      res.status(500).send('Error from Server', error);
    }
  }
);

// @route     PUT api/experiences/deleteAll
// @desc      Update an experience
// @access    Private
//////////////////// DEVELOPMENT PURPOSE SET ALL EXPERIENCE TO deleteRequested : true,
//TO BE ABLE TO RESET USER
//& EXPERIENCE
// Quickly :)

/* ADMIN */
// Obtenir une liste de toutes les expériences.
router.get('/admin/all', admin, async (req, res) => {
  try {
    const AllExperiences = await Experience.find({}).sort({ updatedAt: -1 });

    res.status(200).send(AllExperiences);
  } catch (err) {
    res.status(500).send('Error from Server', err);
  }
});

// Supprimer l'expérience sélectionnée
router.delete('/admin/delete', admin, async (req, res) => {
  const { experienceID, userID } = req.params;

  try {
    await Experience.findOneAndDelete({ id: experienceID });
    const selectAuthor = await User.findById({ _id: userID });

    if (selectAuthor.experienceCreated.length === 0)
      return res
        .status(400)
        .json({ message: 'Cet utilisateur a aucune expérience' });

    // Delete the experienceCreated to the User & Save
    await selectAuthor.experienceCreated.pop();
    await selectAuthor.save();

    //Everything was fine :
    res.status(200).json({
      message:
        'Expérience supprimée, cet utilisateur peut maintenant en créer une autre.',
    });
  } catch (err) {
    res.status(500).send('Error from Server', err);
  }
});

router.put('/admin/validated/:id', admin, async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  try {
    await Experience.findByIdAndUpdate(
      { _id: id },
      { $set: { validated: !state } }
    );
    res.status(200).send('Action effectuée avec succès');
  } catch (err) {
    res.status(500).send('Error from Server', err);
  }
});

// router.put('/deleteAll', async (req, res) => {
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
