const express = require("express");
const router = express.Router();
const Checklist = require("../models/checklist");

// Temporary data (insert into database?)
let questions = [
  "Feeling sad or down in the dumps",
  "Feeling unhappy or blue",
  "Crying spells or tearfulness",
  "Feeling discouraged",
  "Feeling hopeless",
  "Low self-esteem",
  "Feeling worthless or inadequate",
  "Guilt or shame",
  "Criticizing yourself or blaming others",
  "Difficulty making decisions",
  "Loss of interest in family, friends or colleagues",
  "Loneliness",
  "Spending less time with family or friends",
  "Loss of motivation",
  "Loss of interest in work or other activities",
  "Avoiding work or other activities",
  "Loss of pleasure or satisfaction in life",
  "Feeling tired",
  "Difficulty sleeping or sleeping too much",
  "Decreased or increased appetite",
  "Loss of interest in sex",
  "Worrying about your health",
  "Do you have any suicidal thoughts?",
  "Would you like to end your life?",
  "Do you have a plan for harming yourself?",
];

// **********************************
// INDEX - renders multiple checklists
// **********************************
router.get("/checklists", (req, res) => {
  Checklist.find({}, (err, checklists) => {
    if (err) {
      console.log(err);
    } else {
      res.render("checklists/index", { checklists });
    }
  });
});
// **********************************
// NEW - renders a form
// **********************************
router.get("/checklists/new", (req, res) => {
  res.render("checklists/new", { questions });
});
// **********************************
// CREATE - creates a new checklist
// **********************************
router.post("/checklists", (req, res) => {
  const {
    q1,
    q2,
    q3,
    q4,
    q5,
    q6,
    q7,
    q8,
    q9,
    q10,
    q11,
    q12,
    q13,
    q14,
    q15,
    q16,
    q17,
    q18,
    q19,
    q20,
    q21,
    q22,
    q23,
    q24,
    q25,
    comment,
  } = req.body;
  // let stringsToNum = [q1, q2, q3, q4];

  // stringsToNum = stringConvert(stringsToNum);
  // total = numTotal(stringsToNum);
  // let checklist = checklistFill(stringsToNum, total, comment);

  // console.log(checklist);
  // checklists.push(checklist);

  // const checklist = {answers:[]};
  // for(let i = 0; i < questions.length; i++){
  //     let
  // }

  const newChecklist = {
    dateAdded: new Date,
    answers: {
      q1,
      q2,
      q3,
      q4,
      q5,
      q6,
      q7,
      q8,
      q9,
      q10,
      q11,
      q12,
      q13,
      q14,
      q15,
      q16,
      q17,
      q18,
      q19,
      q20,
      q21,
      q22,
      q23,
      q24,
      q25,
    },
    comment
  };
  Checklist.create(newChecklist)
    .then(() => {
      // res.render("checklists/index", { checklists });
      res.send("The POST route create operation was succesful");
      console.log(newChecklist);
    })
    .catch(() => {
      res.send("IT WAS A FLUKE");
    });
});

// *******************************************
// EDIT - renders a form to edit a comment
// *******************************************
router.get("/checklists/:id/edit", (req, res) => {
  const { id } = req.params;
  const checklist = checklists.find((c) => c.id === id);
  let key = "q";
  res.render("checklists/edit", { checklist, questions, key });
});

// *******************************************
// UPDATE - updates a particular checklist
// *******************************************
router.patch("/checklists/:id", (req, res) => {
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
router.delete("/checklists/:id", (req, res) => {
  const { id } = req.params;
  checklists = checklists.filter((c) => c.id !== id);
  res.redirect("/checklists");
});

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

module.exports = router;
