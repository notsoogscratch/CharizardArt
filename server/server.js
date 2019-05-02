const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const queryController = require('./controllers/queryController.js');
const bcryptController = require('./controllers/bcryptController.js');
const cookieController = require('./controllers/cookieController.js');
const sessionController = require('./controllers/sessionController.js');

const testQueryController = require('./controllers/testQueryController.js');
const testBcryptController = require('./controllers/testBcryptController.js');
const testCookieController = require('./controllers/testCookieController.js');
const testSessionController = require('./controllers/testSessionController.js');

const app = express();
const PORT = 3000;

//socket.io  --- copied from https://www.npmjs.com/package/socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// io.listen(server);
io.sockets.on('connect', (socket) => {
  // console.log('this is the socket', socket);
  console.log('connection made');
  socket.send('sup');
  socket.on('message', (data) => {
    console.log('in server +++', data)
    io.emit('message', data)
    // socket.broadcast.emit('message', data)
  });
  
  });
server.listen(PORT, '192.168.0.108');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/api/getallart/', testQueryController.getAllArt, (req, res) => {
  if (res.locals.error) res.send(res.locals.error);
  else res.send(res.locals.result.rows);
});


// testing for sign up route
app.post('/api/testauth/', 
  testBcryptController.hashPassword, 
  testQueryController.testAuth, 
  testCookieController.setSSIDCookie, 
  testSessionController.verifySession, 
  testSessionController.lookupSession, 
  (req, res) => {
    if (res.locals.error) res.send(res.locals.error);
    else res.send(res.locals.result);
  });

  app.post('/api/signup', 
  bcryptController.hashPassword,
  queryController.signUp,
  cookieController.setSSIDCookie,
  sessionController.verifySession,
  sessionController.lookupSession,
  (req, res) => {
    if (res.locals.error) res.send(res.locals.error);
    else res.send(res.locals.result);
  }
  )

// testing for login route
app.post('/api/testsignin', 
  testQueryController.testSignIn, 
  testBcryptController.verifyPassword, 
  testCookieController.setSSIDCookie, 
  testSessionController.verifySession, 
  testSessionController.lookupSession, 
  (req, res) => {
    if (res.locals.error) {
      res.send(res.locals.error);
      res.status(501);
    } 
    else res.send(res.locals.result);
  });
  
  app.post('/api/findbydistance',
  queryController.signIn,
  cookieController.setSSIDCookie,
  sessionController.lookupSession,
  queryController.findByDistance, (req, res) => {
    if (res.locals.error) {
      res.send(res.locals.error);
      res.status(501);
    }
    else res.send(res.locals.result);
  })

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'))
}); 

// app.listen(PORT, () => console.log(`Listening on port ${PORT}`));