const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({

  //Required for Register Page.
  email: {
    type: String, 
    required: true, 
    match: [/\S+@\S+\.\S+/, 'is invalid'], 
    index: true
  },
  password: { 
    type: String,
    required: true,
    minlength: 6,
    //I don't know if bcrypt can do a long long string.. 
    maxlength: 255
  },
  firstName: { 
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20
  },

  //User will fill after register later in his profile.
  lastName: { 
    type: String,
    required: false,
    minlength: 1,
    maxlength: 20
  },
  city: { 
    type: String,
    required: false,
    minlength: 1,
    maxlength: 30
  },
  birthdate: { 
    type: String,
    required: false
  },
  //If user Create an or plurials Experience(s)
  experienceCreated: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience'
  }],
  adminAccess : { 
    type: Boolean,
    required: false,
    default: false
  }
},  {timestamps: true});

module.exports = mongoose.model('user', UserSchema);