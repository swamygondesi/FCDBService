var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var counterSchema = new mongoose.Schema({
  name:String,
  imagename:String,
  abstract: String,
  description: String,
  menu:[
    {category: String,
     itemname: String,
     recipe:String,
     preparetime: Number,
     price: Number
    }
  ]
});

module.exports = mongoose.models.foodstall || mongoose.model('foodstall', counterSchema);
