var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chargesSchema = new mongoose.Schema({
  counterid:String,
  servicecharge:Number,
  gst: Number
});

module.exports = mongoose.models.charge || mongoose.model('charge', chargesSchema);
