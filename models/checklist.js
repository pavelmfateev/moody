const mongoose = require("mongoose");
 
const checklistSchema = new mongoose.Schema({
    dateAdded:  {
      type: Date,
      default: Date.now
    },
    answers: [
      {
        _id: false,
        q1: Number,
        q2: Number,
        q3: Number,
        q4: Number,
        q5: Number,
        q6: Number,
        q7: Number,
        q8: Number,
        q9: Number,
        q10: Number,
        q11: Number,
        q12: Number,
        q14: Number,
        q15: Number,
        q16: Number,
        q17: Number,
        q18: Number,
        q19: Number,
        q20: Number,
        q21: Number,
        q22: Number,
        q23: Number,
        q24: Number,
        q25: Number,
      },
    ],
    total: Number,
    dateAdded: String,
    comment: String,
  });
 
module.exports = mongoose.model("Checklist", checklistSchema);

