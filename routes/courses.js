const express = require ('express');
const router  = express.Router();

courses = [
    {id:1, name:'course_1'},
    {id:2, name:'course_2'},
    {id:3, name:'course_3'},
    {id:4, name:'kenny'},
 ];


router.get('/', (req,res) => {
    res.send(courses);
   
   });
   
   router.get('/:id', (req,res) => {
      const course =  courses.find(c=> c.id === parseInt(req.params.id));
      if (!course) {
          res.status(404).send('Id not found');
          return;
      }
       res.send(course)
      });
   
   router.post('/', (req,res) => {
   
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
   
   router.put('/:id', (req, res) => {
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
   
   router.delete('/:id', (req, res) => {
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

   module.exports = router;