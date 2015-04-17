var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/search/:query', function(req,res){
	var query = req.params.query;


});
module.exports = router;
