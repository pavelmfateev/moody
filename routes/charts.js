const express = require("express");
const checklist = require("../models/checklist");
const router = express.Router();
const Checklist = require("../models/checklist");

// **********************************
// INDEX - renders multiple checklists
// **********************************
router.get("/", async (req, res) => {
  const checklists = await Checklist.find({});
  const obj = {
    labels: [],
    data: [],
  };
  // console.log(checklists[0]);
  res.render("charts/index", { checklists });
});

module.exports = router;
