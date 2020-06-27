const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

TreeSchema = mongoose.Schema({ 
    id: String,
    name: String
});

// TreeSchema.plugin(AutoIncrement, {inc_field: 'id'});

const Tree = mongoose.model('Tree', TreeSchema);

module.exports = Tree;