var express = require('express');
var router = express.Router();

router.all('/', function(req, res, next){
  console.log('root path all router');
  next();
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
