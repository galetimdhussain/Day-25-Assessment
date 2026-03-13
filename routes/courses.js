const express = require("express");

const router = express.Router();

let courses = [
{ id:1, name:"NodeJS", duration:"4 weeks"},
{ id:2, name:"React", duration:"6 weeks"}
];

router.get("/", (req,res)=>{
res.json(courses);
});

router.post("/", (req,res)=>{

const course = {
id: courses.length + 1,
name: req.body.name,
duration: req.body.duration
};

courses.push(course);

res.status(201).json(course);
});

router.put("/:id",(req,res)=>{

const id = parseInt(req.params.id);

const course = courses.find(c=>c.id===id);

if(!course){
return res.status(404).json({error:"Course not found"});
}

course.name = req.body.name || course.name;
course.duration = req.body.duration || course.duration;

res.json(course);
});

router.delete("/:id",(req,res)=>{

const id = parseInt(req.params.id);

courses = courses.filter(c=>c.id !== id);

res.json({message:"Course deleted"});
});

module.exports = router;