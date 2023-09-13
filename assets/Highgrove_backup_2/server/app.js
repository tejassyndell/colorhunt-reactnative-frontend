// const mysql = require('mysql');

// const config = {
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'highgrove'
// };

// const connection = mysql.createConnection(config);

// connection.on('error', (err) => {
//   console.error('Database connection error:', err);
// });

// connection.query('SELECT * FROM users', (err, results) => {
//   if (err) throw err;
//   console.log(results);
// });

// connection.end((err) => {
//   if (err) throw err;
//   console.log('Database connection closed.');
// });

const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
// const sessionMiddleware = require('./session/sessionMiddleWare');
const Routes = require('./router/router');

const app = express();
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'highgrove',
// host: '192.145.239.212',
// user: 'sincpr5_sincpr5',
// password: 'asdfghjklasdfghjklasdfghjkl',
// database: 'sincpr5_highgrove',
});

// connection.connect();
if(connection.connect()){
  console.log("connected")
}else{
  console.log("not connected")
}

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// app.use(sessionMiddleware());

app.use('/', Routes);

app.get('/getImages/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT user_file_data FROM user WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) throw err;
    console.log(result[0].user_file_data, 'img path');
    res.send(result[0].user_file_data);
  });
});

app.get('/test', (req, res) => {
  res.send("Yes bro it's working");
});

app.get('/setSession', (req, res) => {
  req.session.myData = 'Hello, Session!';
  res.send(req.session);
  console.log(req.session)
});

app.get('/getSession', (req, res) => {
  const myData = req.session.myData;
  console.log(req.session);
  res.send(myData);
});

app.listen(8010, () => {
  console.log('Port 8010 is running');
});



// app.listen(8090, () => {
//   console.log('port 8090 Running')
// })// this port is used for milestone 1 and final deployment