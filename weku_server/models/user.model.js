const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

UserSchema = mongoose.Schema({ 
    src: String,
    name: String,
    gender: String,
    lastName: String,
    dateOfBirth: Date,
    placeOfBirth: String,
    countryOfOrigin: String,
    currentNationality: String,
    username: String,
    email: String,
    password: String,
    father: Number,
    mother: Number,
    wife: Number,
    husband: Number,
    siblings: [],
    children: [],
    journal: [],
    treeId: String
})

UserSchema.plugin(AutoIncrement, {inc_field: 'id'});

const User = mongoose.model('User', UserSchema);

module.exports = User;