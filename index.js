const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config =  require('config');
const morgan = require ('morgan');
const express = require ('express');
const helmet = require ('helmet');
const Joi = require ('joi');
const logger = require('./middleware/logger')
const courses = require('./routes/courses');
const home = require('./routes/home');
const app  = express();

app.set('view engine','pug');
app.set('views','./views');

// Config
//console.log( 'Application name: ' + config.get('name'));
//console.log( 'Mailname: ' + config.get('mail.host'));
//console.log( 'Mail password: ' + config.get('production.mail.password'));

if(app.get('env')=== 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan middleware enabled...')
}

dbDebugger('Connected to the database');


app.use(express.json());
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))

app.use(logger);




const port = process.env.Port || 3000;
app.listen(port, ()=> console.log (`listening on port ${port}...`));