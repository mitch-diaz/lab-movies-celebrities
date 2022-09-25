const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    favorites: {type: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Movie'
        }
      ]
    }
}, { 
    timestamps: true
})

const User = model('User', userSchema);
module.exports = User;