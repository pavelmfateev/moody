// SETUP
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuid } = require("uuid");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Temporary test data
let questions = [
  "Feeling sad or down in the dumps",
  "Feeling unhappy or blue",
  "Crying spells or tearfulness",
  "Feeling discouraged",
];
// let dateGen = new Date().toDateString();

const dateGen = () => {
  return new Date().toDateString();
};

let checklists = [
  {
    q1: 0,
    q2: 1,
    q3: 2,
    q4: 3,
    total: 6,
    id: uuid(),
    date: dateGen(),
    comment: "This is my first entry",
  },
  {
    q1: 2,
    q2: 3,
    q3: 1,
    q4: 1,
    total: 7,
    id: uuid(),
    date: dateGen(),
    comment: "Testing",
  },
  {
    q1: 0,
    q2: 1,
    q3: 1,
    q4: 1,
    total: 3,
    id: uuid(),
    date: dateGen(),
    comment: "I am also testing",
  },
];

// ROUTES
app.get("/", (req, res) => {
  res.render("index");
});

// **********************************
// INDEX - renders multiple checklists
// **********************************
app.get("/checklists", (req, res) => {
  // let total = 0;
  // for(let i = 0; i < questions.length; i++){
  //     console.log(checklists[i]);
  // }
  res.render("checklists/index", { checklists });
});
// **********************************
// NEW - renders a form
// **********************************
app.get("/checklists/new", (req, res) => {
  res.render("checklists/new", { questions });
});
// **********************************
// CREATE - creates a new checklist
// **********************************
app.post("/checklists", (req, res) => {
  const { q1, q2, q3, q4, comment } = req.body;
  let stringsToNum = [q1, q2, q3, q4];
  let total = 0;
  for (let i = 0; i < stringsToNum.length; i++) {
    stringsToNum[i] = parseInt(stringsToNum[i]);
    total += stringsToNum[i];
  }
  let checklist = {};

  for (let i = 1; i <= stringsToNum.length; i++) {
    let key = "q" + i;
    checklist[key] = stringsToNum[i - 1];
  }

  (checklist.total = total),
    (checklist.id = uuid()),
    (checklist.date = dateGen()),
    (checklist.comment = comment);

  console.log(checklist);
  checklists.push(checklist);

  res.render("checklists/index", { checklists });
});

// *******************************************
// EDIT - renders a form to edit a comment
// *******************************************
app.get("/checklists/:id/edit", (req, res) => {
  const { id } = req.params;
  const checklist = checklists.find((c) => c.id === id);
  res.render("checklists/edit", { checklist });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
