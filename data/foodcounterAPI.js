"use strict"
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var fcapp = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mydb',{ useNewUrlParser: true });

var counterSchema = new mongoose.Schema({
  name:String,
  imagename:String,
  abstract: String,
  description: String,
  menu:[
    {category: String,
     itemname: String,
     price: Number
    }
  ]
});

var Counters = mongoose.model('foodcounter',counterSchema);

fcapp.use(function(req,res,next){
  req.Counters = Counters;
  next();
});


var FoodCounterAPI = {
  saveCounter: function(counter, callback) {
    var newCounter = new Counters(counter);
    newCounter.save(function(err,callback){
      if(err)
       return '{0}';
      else {
        callback(null, counter);
      }
    });
  },
  getCounters: function(callback) {
    Counters.find({},function(err,counters){
      if(err)
        return '{0}';
      else {
        callback(null,counters);
      }
    });
  },
  getCounterById: function(id, callback) {
    var counter = Counters.findOne({id},function(err,counter){
      if(err)
        return '{0}';
      else {
        callback(null,counter);
      }
    });
  }
};
