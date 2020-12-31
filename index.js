// SETUP
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");

app.use(express.static(path.join(__dirname, "public")));
//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }));
// To parse incoming JSON in POST request body:
app.use(express.json());
// To 'fake' put/patch/delete requests:
app.use(methodOverride("_method"));
// Views folder and EJS setup:
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Temporary test data
let questions = [
  "Feeling sad or down in the dumps",
  "Feeling unhappy or blue",
  "Crying spells or tearfulness",
  "Feeling discouraged",
];

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

  stringsToNum = stringConvert(stringsToNum);
  total = numTotal(stringsToNum);
  let checklist = checklistFill(stringsToNum, total, comment);

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
  let key = "q";
  res.render("checklists/edit", { checklist, questions, key });
});

// *******************************************
// UPDATE - updates a particular checklist
// *******************************************
app.patch("/checklists/:id", (req, res) => {
  const { id } = req.params;
  const foundChecklist = checklists.find((c) => c.id === id);
  const { q1, q2, q3, q4, comment: newCommentText } = req.body;
  let stringsToNum = [q1, q2, q3, q4];
  stringsToNum = stringConvert(stringsToNum);
  let total = numTotal(stringsToNum);

  //update the object with the new data from req.body:
  (foundChecklist.total = total),
    (foundChecklist.comment = newCommentText),
    (foundChecklist.q1 = stringsToNum[0]),
    (foundChecklist.q2 = stringsToNum[1]),
    (foundChecklist.q3 = stringsToNum[2]),
    (foundChecklist.q4 = stringsToNum[3]);

  res.redirect("/checklists");
});

// *******************************************
// DELETE/DESTROY- removes a single comment
// *******************************************
app.delete('/checklists/:id', (req, res) => {
  const { id } = req.params;
  checklists = checklists.filter(c => c.id !== id);
  res.redirect('/checklists');
})

// HELPER METHODS
// converts json response values from string to numbers
const stringConvert = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = parseInt(arr[i]);
  }
  return arr;
};
// calculates the total from response
const numTotal = (arr) => {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    arr[i] = parseInt(arr[i]);
    total += arr[i];
  }
  return total;
};
// fills in checklist object
const checklistFill = (arr, total, comment) => {
  let checklist = {};

  for (let i = 1; i <= arr.length; i++) {
    let key = "q" + i;
    checklist[key] = arr[i - 1];
  }

  (checklist.total = total),
    (checklist.id = uuid()),
    (checklist.date = dateGen()),
    (checklist.comment = comment);

  return checklist;
};

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
