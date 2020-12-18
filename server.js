var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const cors = require('cors');

// import routers
var index = require('./routes/index');

var users = require('./routes/users');

var error = require('./routes/error');

var app = express();

var http = require('http');                    
 
var server = http.createServer(app);      
 
const io = require('socket.io')(server);  

const ioController = require('./controllers/ioController');     
io.on('connection', socket => ioController.connect(socket));    
 
server.listen(process.env.PORT); 
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/chat', index);

// error handler
app.use(error);

