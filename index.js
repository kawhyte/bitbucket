const config =  require('config');
const morgan = require ('morgan');
const express = require ('express');
const helmet = require ('helmet');
const Joi = require ('joi');
const logger = require('./logger')
const app  = express();

// Config
console.log( 'Application name: ' + config.get('name'));
console.log( 'Mailname: ' + config.get('mail.host'));
console.log( 'Mail password: ' + config.get('production.mail.password'));

if(app.get('env')=== 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan middleware enabled...')
}
//console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//console.log(`app.get: ${app.get('env')}`);


app.use(express.json());
app.use(helmet());

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))

app.use(logger);

 courses = [
    {id:1, name:'course_1'},
    {id:2, name:'course_2'},
    {id:3, name:'course_3'},
    {id:4, name:'kenny'},
 ];


app.get('/', (req, res) => {

//console.log( "Hello World");

res.send('Hello World');

});

app.get('/api/courses', (req,res) => {
 res.send(courses);

});

app.get('/api/courses/:id', (req,res) => {
   const course =  courses.find(c=> c.id === parseInt(req.params.id));
   if (!course) {
       res.status(404).send('Id not found');
       return;
   }
    res.send(course)
   });

app.post('/api/courses', (req,res) => {

    const result = valiateCourse(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
   
    const course =  {
        id: courses.length +1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
   });

app.put('/api/courses/:id', (req, res) => {
   const course =  courses.find(c=> c.id === parseInt(req.params.id));
   if (!course) {
       res.status(404).send('Id not found');
       return;
   }
   const result = valiateCourse(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);

});

app.delete('/api/courses/:id', (req, res) => {
   const course =  courses.find(c=> c.id === parseInt(req.params.id));
   if (!course){
    res.status(404).send('Id not found');
    return;
   } 

   const index = courses.indexOf(course);
   courses.splice(index, 1);
   res.send(course);
});

function valiateCourse(course){
    const schema ={
        name: Joi.string().min(3).required()
        };
    
        return Joi.validate( course, schema);

}




const port = process.env.Port || 3000;

app.listen(port, ()=> console.log (`listening on port ${port}...`));