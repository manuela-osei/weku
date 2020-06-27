// Setup database with mongoose
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//set mongo url to uri
const uri = "mongodb+srv://manuela:rSsWtqKxmQEqHhh4@weku-staging-uddsj.mongodb.net/test?retryWrites=true&w=majority";

//connection to mogodb cloud
mongoose.connect(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//conection approve
var db = mongoose.connection;//reference to connection
//if not connected throw error
db.on('error', console.error.bind(console, 'connection error:'));
//if connected let us know
db.once('open', function() {
  // we're connected!
  console.log("We are connected to db!");
});

module.exports = mongoose;