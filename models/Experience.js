const mongoose = require('mongoose');

const ExperienceSchema = mongoose.Schema(
  {
    //Simple required things for create an Experience
    title: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 150,
    },
    description: {
      type: String,
      required: true,
    },
    imagesURL: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    comments: [
      {
        commentAuthor: {
          // Take ID of the creator of this comment...
          type: String,
        },
        commentMessage: {
          type: String,
        },
      },
    ],
    // Will autohorize by myself to show this experience or not
    validated: {
      type: Boolean,
      required: false,
      default: false,
    },
    deleteRequested: {
      type: Boolean,
      default: false,
    },
    // ID of the Author of this experience to get his name, and appear in it.
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('experience', ExperienceSchema);
