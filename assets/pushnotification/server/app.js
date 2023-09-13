/* eslint-disable */
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const Routes = require('./router/router')
//const connection = require('./database/database')

app.use(express.json())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use('/', Routes)

app.get("/", (req, res) => {
  res.send('<div style="display: flex; justify-content: center; align-items: center; height: 100vh;"><div style="text-align:center; font-size: 40px; font-weight: 500; font-family: Arial;">Garment Backend</div></div>');
});


app.listen(8020, () => {
  console.log('port 8020 Running')
})
