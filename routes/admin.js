var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var _ = require('lodash');
var users = require('./users_model');
var foodstall = require('./foodcounter_model');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mydb',{ useNewUrlParser: true });

router.post('/vendor',function(req,res){
  var user = new users();
  user.username= req.body.username;
  user.password = req.body.password;
  user.role = req.body.role;
  var newCounter = new foodstall();
  newCounter.name = req.body.name;
  newCounter.imagename= req.body.imagename;
  newCounter.abstract = req.body.abstract;
  newCounter.description = req.body.description;

  newCounter.save(function(err,counter){
    if(err) {
      console.log(err);
     return err;
   }else {
      console.log(counter);
      user.counterid = counter._id;
      user.save(function(err,user){
        if(err) {
          console.log(err);
        } else {
          console.log('user saved = '+user);
        }
      });
      res.send(counter);
    }
  });

});

router.put('/vendor/:id',function(req,res){
  //var user = new users();
  //var newCounter = new foodstall();
  console.log('id =>'+req.params.id);
  foodstall.findOneAndUpdate(
    {_id:req.params.id},
    {
      $set: {
        name:req.body.name,
        imagename:req.body.imagename,
        abstract: req.body.abstract,
        description:req.body.description
        }
    },
    {new:true},
    function(err,counter){
      if(err){
        console.log(err);
        res.send(err);
      } else {
        //console.log(counter);
        console.log('counterid =>'+req.params.id);
        console.log('username =>'+req.body.username);
        console.log('password =>'+req.body.password);
        console.log('role =>'+req.body.role);
        users.findOneAndUpdate(
          {counterid:req.params.id},
          {
            $set: {
              username: req.body.username,
              password: req.body.password,
              role: req.body.role
            }
          },
          {new:true},
          function(err,vendor){
            if(err){
              console.log(err);
              res.send(err);
            } else {

              if(vendor != null )
              console.log('user updated = '+vendor);
              else {
                var user = new users();
                user.username= req.body.username;
                user.password = req.body.password;
                user.role = req.body.role;
                user.counterid = req.params.id;
                user.save(function(err,user){
                  if(err) {
                    console.log(err);
                  } else {
                    console.log('user saved = '+user);
                  }
                });
              }
            //  res.json(vendor);
            }
          }
        );
        res.json(counter);
      }
    }
  );
});

router.delete('/vendor/:id',function(req,res){
  console.log('id = '+req.params.id);
  foodstall.findOneAndRemove(
    {_id:req.params.id},
    function(err,counter) {
      if(err)
        res.send(err);
      else {
        console.log(counter);
        users.findOneAndRemove(
          {counterid:req.params.id},
          function(err,user){
            if(err)
             console.log(err);
            else{
              console.log(user);
            }
          }
        );
        res.json(counter);
      }
    }
  );
});

module.exports = router;
