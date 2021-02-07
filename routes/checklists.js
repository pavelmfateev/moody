const express = require("express");
const router = express.Router();
const Checklist = require("../models/checklist");

// Question data (insert into database?)
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
router.get("/", async (req, res) => {
  const checklists = await Checklist.find({});
  res.render("checklists/index", { checklists });
});
// **********************************
// NEW - renders a form
// **********************************
router.get("/new", (req, res) => {
  res.render("checklists/new", { questions });
});
// **********************************
// CREATE - creates a new checklist
// **********************************
router.post("/", async (req, res) => {
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

  const newChecklist = {
    dateAdded: new Date(),
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
    comment,
    total: 0,
  };

  newChecklist.total = numTotal(newChecklist.answers);
  const createChecklist = new Checklist(newChecklist);
  await createChecklist.save();  
  res.redirect("/checklists");
});

// *******************************************
// EDIT - renders a form to edit a comment
// *******************************************
router.get("/:id/edit", (req, res) => {
  const { id } = req.params;
  Checklist.findById(id)
    .then((data) => {
      let key = "q";
      res.render("checklists/edit", { checklist: data, questions, key });
    })
    .catch((err) => {
      console.log(err);
      res.send("IT WAS A FLUKE");
    });
});

// *******************************************
// UPDATE - updates a particular checklist
// *******************************************
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const answersFormatted = answers(req.body);

  const updateObj = {
    answers: answersFormatted.answers,
    comment: req.body.comment,
  };
  const checklist = await Checklist.findByIdAndUpdate(id, updateObj, {
    runValidators: true,
    new: true,
  });

  res.redirect("/checklists");
});

// *******************************************
// DELETE/DESTROY- removes a single comment
// *******************************************
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Checklist.findByIdAndDelete(id);
  res.redirect("/checklists");
});

// HELPER METHODS
// calculates the total from response
const numTotal = (object) => {
  let total = 0;
  for (const property in object) {
    let numTemp = parseInt(object[property]);
    total += numTemp;
  }
  return total;
};

// fills object with answers from req.body
const answers = (objIn) => {
  objOut = { answers: {} };
  for (const property in objIn) {
    if (property != "comment") {
      objOut.answers[property] = objIn[property];
    }
  }
  return objOut;
};

module.exports = router;
