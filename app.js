const express = require('express');
const exphbs  = require('express-handlebars');
const path    = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Set port
const port = 3000;

// Init app
const app = express();

// View engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// MethodOverride
app.use(methodOverride('_method'));

// Public folder
app.use(express.static(process.cwd() + "/public"));

// Controllers
const index = require('./controllers/index');
const users = require('./controllers/users');

// Setup the routes
app.use('/', index); // Index controller
app.use('/users', users); // Users controller

// Listen for connections.
app.listen(port, function () {
    console.log(`Server started on http://localhost:${port}/`);
});