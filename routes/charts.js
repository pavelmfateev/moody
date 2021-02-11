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
  const chartData = {
    data: []
  };

  
  // console.log(chartObj.data.datasets[0]); 
  let i = 0;
  for(let property in checklists){
    let formatted_date = moment(checklists[property].dateAdded).format("YYYY-MM-DD");
    
    chartData.data[i] = {
      x: formatted_date,
      y: checklists[property].total
    };
    i++;
  }
  // console.log(chartData);
  res.render("charts/index", { chartData });
});

module.exports = router;
