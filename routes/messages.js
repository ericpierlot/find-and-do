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
const Message = require('../models/Message');

// @route GET api/messages/
// @desc  Check if have a message
// @access Private

router.post('/', auth, async (req, res) => {
  const { id } = req.user;

  try {
    const userRecipient = await Message.find({
      recipient: { $in: id },
    })
      .lean()
      .sort({ updatedAt: -1 })
      .limit(20);

    await Promise.all(
      userRecipient.map((item) => {
        const senderFirstName = User.find({
          _id: { $in: item.sender },
        })
          .select('firstName')
          .select('-_id')
          .then((result) => {
            const content = result.map((res) => {
              return res.firstName;
            });

            item.senderFirstName = content;
            return content;
          });

        return senderFirstName;
      })
    )
      .then(() => {
        if (userRecipient.length > 0) {
          return res.status(200).send([...userRecipient]);
        }
        if (userRecipient.length === 0) {
          return res.status(200).json(0);
        }
      })
      .catch(() =>
        res
          .status(401)
          .json({ message: 'Une erreur est survenue lors de la recherche' })
      );

    // if (userRecipient.length > 0) return res.status(200).json(userRecipient);
    // if (userRecipient.length === 0) return res.status(200).json(0);
  } catch (error) {
    res
      .status(401)
      .json({ message: 'Une erreur est survenue lors de la recherche' });
  }
});

router.delete('/delete', auth, async (req, res) => {
  const { id } = req.query;
  try {
    const deleteUserMessage = await Message.findOneAndDelete({ _id: id });
    res.status(200).json('success');
  } catch (error) {
    res.status(401).json({ message: error });
  }
});

router.post('/sended', auth, async (req, res) => {
  //const { id } = req.user;
  const { id } = req.user;

  try {
    // Je récupère tout les messages où l'id de l'utilisateur est de l'envoyeur
    const userSender = await Message.find({
      sender: { $in: id },
    })
      .lean()
      .sort({ updatedAt: -1 })
      .limit(20);

    await Promise.all(
      userSender.map((item) => {
        const recipientFirstName = User.find({
          _id: { $in: item.recipient },
        })
          .select('firstName')
          .select('-_id')
          .then((result) => {
            const content = result.map((res) => {
              return res.firstName;
            });

            item.recipientFirstName = content;
            return content;
          });

        return recipientFirstName;
      })
    )
      .then(() => {
        if (userSender.length > 0) {
          return res.status(200).send([...userSender]);
        }
        if (userSender.length === 0) {
          return res.status(200).json(0);
        }
      })
      .catch(() =>
        res
          .status(401)
          .json({ message: 'Une erreur est survenue lors de la recherche' })
      );
  } catch (error) {
    res
      .status(401)
      .json({ message: 'Une erreur est survenue lors de la recherche' });
  }
});

// @route POST api/messages/
// @desc  Send a message
// @access Private

router.post(
  '/send',
  auth,
  [
    body(
      'messageToSend',
      'Message must be longer than 20 characters, maximum of 650 characters'
    ).isLength({
      min: 20,
      max: 650,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { messageToSend, recipientID, sendUserID } = req.body;

    try {
      const message = new Message({
        message: {
          text: messageToSend,
        },
        recipient: recipientID,
        sender: sendUserID,
      });

      // const message = new Message({
      //   message: {
      //     text: messageToSend,
      //   },
      //   users: [
      //     {
      //       user: recipientID,
      //     },
      //   ],
      //   sender: sendUserID,
      // });

      message.save();
      res.json({
        message: 'Message has been sended',
      });
    } catch (error) {
      console.error('err', error);
    }
  }
);

module.exports = router;
