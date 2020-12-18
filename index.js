const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }))
app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render('index');
})

app.post('/track', (req, res) => {
  res.render('index');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})