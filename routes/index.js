var express = require('express');
var app = express();
var cors = require('cors');

var router = express.Router();

app.use(cors())

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
