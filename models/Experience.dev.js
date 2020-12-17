"use strict";

var mongoose = require('mongoose');

var ExperienceSchema = mongoose.Schema({
  //Simple required things for create an Experience
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40
  },
  photos: {
    type: String,
    required: false
  },
  lieu: {
    type: String,
    required: true
  },
  exactAddress: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  precision: {
    type: String,
    required: true
  },
  programme: {
    type: String,
    required: true
  },
  aboutYou: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  comments: [{
    commentAuthor: {
      // Take ID of the creator of this comment...
      type: String
    },
    commentMessage: {
      type: String
    }
  }],
  // Will autohorize by myself to show this experience or not
  // Modifier à false pour activer cette fonction.
  validated: {
    type: Boolean,
    required: false,
    "default": true
  },
  // ID of the Author of this experience to get his name, and appear in it.
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('experience', ExperienceSchema);