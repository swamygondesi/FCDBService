var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var _ = require('lodash');
var foodstall = require('./foodcounter_model');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mydb',{ useNewUrlParser: true });

router.post('/:id',function(req,res){
  var index = req.body.index;
  var menu = {};
  menu.category = req.body.category;
  menu.itemname = req.body.itemname;
  menu.price = req.body.price;
  menu.recipe = req.body.recipe;
  menu.preparetime= req.body.preparetime;
  console.log('New Menu = '+JSON.stringify(menu));
  foodstall.findOne({_id:req.params.id},
    function(err,counter){
    if(err)
      res.send(err);
    else {
      //res.json(counter);
      var newCounter = new foodstall(counter);
      newCounter.menu[index] = menu;

      newCounter.save(function(err,updated){
        if(err) {
          return err;
        } else {
          console.log('Created Menu = '+updated);
          res.json(updated);
        }
      });
    }
  });
});

router.put('/:id',function(req,res){
  var index = req.body.index;
  console.log('Index = '+index);
  var menu = {};
  menu.category = req.body.category;
  menu.itemname = req.body.itemname;
  menu.price = req.body.price;
  menu.recipe = req.body.recipe;
  menu.preparetime= req.body.preparetime;
  console.log('Menu category = '+menu.category);
  console.log('Menu itemname = '+menu.itemname);
  console.log('Menu recipe = '+menu.recipe);
  console.log('Menu price = '+menu.price);
  console.log('Menu preparetime = '+menu.preparetime);
  foodstall.findOne({_id:req.params.id},
    function(err,counter){
    if(err)
      res.send(err);
    else {
      var newCounter = new foodstall(counter);
      newCounter.menu[index] = menu;

      newCounter.save(function(err,updated){
        if(err) {
          res.send(err);
        } else {
          console.log('Updated Menu = '+updated);
          res.json(updated);
        }
      });
    }
  });
});

router.delete('/:id/:vid',function(req,res){
  var id = req.params.vid;
  console.log('Foodcounter ID ='+id);
  foodstall.findOneAndUpdate({_id:id},
    {
      $pull:{
        menu:{_id:req.params.id}
      }
    }, function(err,foodcounter){
      if(err) {
        res.send(err);
      } else {
        res.json(foodcounter);
      }
    }
  );
});
module.exports = router;
