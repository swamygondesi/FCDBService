var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var _ = require('lodash');
var order = require('./order_model');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mydb',{ useNewUrlParser: true });

router.get('/:id',function(req,res){
  order.findOne({ordernumber:req.params.id}, function(err, order){
    if(err)
     res.send(err);
    else {
      console.log('Order ='+order);
      res.json(order);
    }
  });
});

router.get('/all/:id',function(req,res){
  order.find({counterid:req.params.id}, function(err, orders){
    if(err)
     res.send(err);
    else {
      res.json(orders);
    }
  });
});

router.put('/:id',function(req,res){
order.findOneAndUpdate(
  {ordernumber:req.params.id},
  {
    $set:{
      status:true
    }
  },
  {new:true},
   function(err,order){
  if(err)
   res.send(err);
  else{
  res.json(order)
 }
});
});

router.post('/create',function(req,res){
  var newOrder =  new order();
  newOrder.ordernumber = req.body.ordernumber;
  newOrder.counterid = req.body.counterid;
  newOrder.countername = req.body.countername;
  newOrder.counterimage = req.body.counterimage;
  newOrder.status = false;
  var index = 0;
  _.forEach(req.body.order, function(item){
    var order = {};
    order.itemname = item.itemname;
    order.quantity = item.quantity;
    order.price = item.price;
    newOrder.order[index] = order;
    index++;
  });
newOrder.save(function(err,order){
  if(err) {
    res.send(err);
  } else {
    res.json(order);
  }
});

});
module.exports = router;
