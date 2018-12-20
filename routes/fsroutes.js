var FoodCounterAPI = require('../data/foodcounterAPI');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var _ = require('lodash');
var foodstall = require('./foodcounter_model');
var charge = require('./fccharges_model');
// Database part
var fcapp = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mydb',{ useNewUrlParser: true });


// fcapp.use(function(req,res,next){
//   req.Counters = foodcounter;
//   next();
// });


router.get('/foodcounters',function(req,res){
  foodstall.find({},function(err,counters){
    if(err)
      res.send(err);
    else {
      res.json(counters);
    }
  });
});

router.get('/foodcounters/:id',function(req,res){
  foodstall.findOne({_id:req.params.id},function(err,counter){
    if(err)
      res.send(err);
    else {
      res.json(counter);
    }
  });
});

router.post('/foodcounters/create', function(req,res){
  var newCounter = new foodstall();
  newCounter.name = req.body.name;
  newCounter.imagename= req.body.imagename;
  newCounter.abstract = req.body.abstract;
  newCounter.description = req.body.description;
  var index = 0;
  //var menu = {};
 //console.log('Menu = '+JSON.stringify(req.body.menu));
  _.forEach(req.body.menu, function(item){
  //  console.log(' category = '+item.category+ ' name='+item.itemname+' price='+item.price);
    var menu = {};
    menu.category = item.category;
    menu.itemname = item.itemname;
    menu.price = item.price;
    menu.recipe = item.recipe;
    menu.preparetime= item.preparetime;
  //  console.log('Menu ='+JSON.stringify(menu)+ ' of Index ='+index);
    newCounter.menu[index] = menu;
    //console.log('newCounter ='+JSON.stringify(newCounter)+ ' of Index ='+index);
    // newCounter.menu[index].category = item.category;
    // newCounter.menu[index].itemname = item.itemname;
    // newCounter.menu[index].price = item.price;
    index++;
  });
  newCounter.save(function(err,counter){
    if(err) {
      console.log(err);
     res.send(err);
   }else {
      console.log(counter);
      console.log('Counter ID = '+counter._id);
      var newCharge = new charge();
      newCharge.counterid = counter._id;
      newCharge.servicecharge = req.body.servicecharge;
      newCharge.gst = req.body.gst;

      newCharge.save(function(err,charge){
        if(err) {
          console.log(err);
          res.send(err);
        } else {
          console.log(charge);
          //res.json(charge);
        }
      });
      res.send(counter);
    }
  });
  // // FoodCounterAPI.saveCounter(counter, function(err, counter){
  // //   res.json('{1}');
  // });
});

router.get('/foodstall/service/:id',function(req,res){
  charge.findOne({counterid:req.params.id}, function(err,charge){
    if(err)
      res.send(err);
    else
      res.json(charge);
  });
});


router.put('/foodstall/service/:id',function(req,res){
  charge.findOneAndUpdate(
    {counterid:req.params.id},
    {
      $set:{
        servicecharge:req.body.servicecharge,
        gst:req.body.gst
      }
    },
     function(err,charge){
    if(err)
      res.send(err);
    else
      res.json(charge);
  });
});

router.post('/foodstall/service',function(req,res){
  var newCharge = new charge();
  newCharge.counterid = req.body.counterid;
  newCharge.servicecharge = req.body.servicecharge;
  newCharge.gst = req.body.gst;

  newCharge.save(function(err,charge){
    if(err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(charge);
      res.json(charge);
    }
  });
});

module.exports = router;
