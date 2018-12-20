var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var _ = require('lodash');
var users = require('./users_model');
/* GET users listing. */
router.get('/user/:username/:password', function(req, res) {
  var password = req.params.password;
  users.findOne({username:req.params.username,password:password},function(err,user){
    if(err){
      console.log('err = '+err);
     res.json("{'role':false}");
   } else {
     console.log('User by name = '+user);
     res.json(user);
   }
  });
});

router.post('/register',function(req,res){
  var newUser = new users();
  newUser.username = req.body.username;
  newUser.password = req.body.password;
  newUser.role = req.body.role;
  newUser.counterid = req.body.counterid;
  newUser.save(function(err,user){
    if(err)
     res.send(err);
    else
     res.json(user);
  });
});

router.get('/user/:id',function(req,res){
  var counterid = req.params.id;
  console.log('Counterid ='+counterid);
  users.findOne({counterid:counterid},function(err,user){
    if(err)
     res.send(err);
    else {
      console.log('User by id = '+user);
     res.json(user);
   }
  });
});

router.get('/username/:username',function(req,res){
  users.findOne({username:req.params.username},function(err,user){
    if(err)
     res.json("{'isUser':false}");
    else
     res.json("{'isUser':true}");
  });
});
module.exports = router;
