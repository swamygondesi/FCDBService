var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ordersSchema = new mongoose.Schema({
  ordernumber: String,
  counterid:String,
  countername:String,
  counterimage: String,
  status: Boolean,
  order:[
    {
      itemname:String,
      quantity: Number,
      price: Number
    }
  ]
});

module.exports = mongoose.models.order || mongoose.model('order', ordersSchema);
