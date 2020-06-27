// Get the mongoose database
const mongoose = require('./services/mongoose');

// Initialize the server 
const app = require('./services/server');

// Define all the routes
app.use('/', require('./routes/api.route'));

/* Starting the server on port 3000 */
const port = 3000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));