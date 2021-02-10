const express = require("express"),
  checklist = require("../models/checklist"),
  router = express.Router(),
  Checklist = require("../models/checklist"),
  moment = require("moment");

// **********************************
// INDEX - renders multiple checklists
// **********************************
router.get("/", async (req, res) => {
  const checklists = await Checklist.find({});
  const chartObj = {
    data: []
  };
  
  let i = 0;
  for(let property in checklists){
    console.log(property);
    // let formatted_date = moment(checklists)
    // chartObj.data[i] = {
    //   x: 
    // };
  }
  // console.log(checklists[0]);
  res.render("charts/index", { checklists });
});

module.exports = router;
