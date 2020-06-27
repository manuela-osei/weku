const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

UserFeedSchema = mongoose.Schema({
    title: String,
    description: String,
    src: String,
    vidSrc: String,
    date: String,
    userId: String,
});

// TreeSchema.plugin(AutoIncrement, {inc_field: 'id'});

const UserFeed = mongoose.model('UserFeed', UserFeedSchema);

module.exports = UserFeed;