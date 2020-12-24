// SETUP
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Temporary test data
let questions = [
  "Feeling sad or down in the dumps",
  "Feeling unhappy or blue",
  "Crying spells or tearfulness",
  "Feeling discouraged"
]

let checklists = [
  {
    id:,
    date:new Date(),
    comment:,
    1: 0,
    2: 1, 
    3: 2,
    4: 3 

  }
]

// ROUTES
app.get('/', (req, res) => {
  res.render("index");
});

app.get('/checklists', (req, res) => {
  res.render('checklists');
});

app.post('/checklists', (req, res) => {
  console.log(req.body);
  
  res.send("Hello");
});

app.get('/checklists/new', (req, res) => {
  res.render('new', {questions});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
