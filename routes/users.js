const express = require("express");

const router = express.Router();

let users = [
{ id:1, name:"John"},
{ id:2, name:"Mike"}
];

router.get("/", (req,res)=>{
res.json(users);
});

router.post("/", (req,res)=>{

const user = {
id: users.length + 1,
name: req.body.name
};

users.push(user);

res.status(201).json(user);
});

module.exports = router;