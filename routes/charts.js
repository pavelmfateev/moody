const express = require("express");
const router = express.Router();
const Checklist = require("../models/checklist");

// **********************************
// INDEX - renders multiple checklists
// **********************************
router.get("/", async (req, res) => {
    const checklists = await Checklist.find({});
    
    res.render("charts/index", { checklists });
  });

module.exports = router;