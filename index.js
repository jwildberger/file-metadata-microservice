var express = require('express');
var app = express();
var multer = require('multer');
var upload = multer({ limits: {fileSize: 1000000} });

app.set('views', './views');
app.set('view engine', 'jade'); 

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/', upload.single('file'), function (req, res) {
  var result = req.file.originalname + " is " + req.file.size + " bytes."
  res.render('index', {result: result});
});

app.use(function(err, req, res, next){
	res.status(500);
	res.render('index', {result: "File is too large."})
});

app.use(function(req, res, next) {
  res.status(404).send('Nothing here.');
});

app.listen(process.env.PORT||3000);