

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({

  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  perm: [
    {
      type: Schema.Types.Mixed,
      required: true
      //ref: "fields"
    }
  ]

});

module.exports = User = mongoose.model('users', UserSchema);