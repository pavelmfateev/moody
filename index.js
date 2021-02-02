// SETUP
const express = require("express"),
  app = express(),
  port = 3000,
  path = require("path"),
  methodOverride = require("method-override"),
  { v4: uuid } = require("uuid");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/depressionApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("OH NO ERROR");
    console.log(err);
  });

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

const checklistsRoutes = require("./routes/checklists.js");

// const firstTest = new Checklist({
//   answers: [
//     {
//       q1: 0,
//       q2: 1,
//       q3: 2,
//       q4: 3,
//       q5: 0,
//       q6: 1,
//       q7: 2,
//       q8: 3,
//       q9: 2,
//       q10: 3,
//       q11: 1,
//       q12: 1,
//       q14: 0,
//       q15: 0,
//       q16: 0,
//       q17: 1,
//       q18: 2,
//       q19: 3,
//       q20: 3,
//       q21: 2,
//       q22: 1,
//       q23: 0,
//       q24: 1,
//       q25: 0,
//     },
//   ],
//   total: 25,
//   dateAdded: dateGen(),
//   comment: "Did this work?",
// });

app.use(checklistsRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
