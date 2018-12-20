var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var multer = require('multer');

const DIR = 'C:\\fullstack\\angular_ws\\assignments\\foodcourt\\fcapp\\src\\assets\\images';


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
});
let upload = multer({storage: storage});

router.post('/image',upload.single('photo'), function (req, res) {
  console.log('inside upload image req=>'+req);
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });

      } else {
        console.log('file received');
        return res.send({
          success: true
        })
      }
});

module.exports = router;
