var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { message: '' });
});
var multer = require('multer');


var maxSize = 2*1024*1024;
var storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
      if(file.mimetype==="image/jpeg"){
        cb(null,'upFile/');
      }else {
        cb(new Error("ERRORRRRRRRRRRR!" + "chon duoi .jpg"),false)
      }
      console.log(parseFloat(file.size))

  },
  filename: function (req, file, cb) {
    const a= Math.random();
    cb(null, Date.now() + a +'-----' + file.originalname);
  }
});
var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize }
}).array('avatar',5);

router.get('/upload', function (req, res) {
  res.render('index', {message: ''})
})
router.post('/upload',function (req,res){
  upload(req, res, function (err) {
    if (err) {
      res.render('index', {message: err.message})
    } else {
      res.render('index', {message: 'Tải file thành công!!!'})
    }
  })
})
module.exports = router;
