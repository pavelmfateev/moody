const mongoose = require("mongoose");
 
const checklistSchema = new mongoose.Schema({
    dateAdded:  {
      type: Date,
      default: Date.now
    },
    answers: [
      {
        _id: false,
        q2: {type: Number, required: true},
        q1: {type: Number, required: true},
        q3: {type: Number, required: true}, 
        q4: {type: Number, required: true},
        q5: {type: Number, required: true},
        q6: {type: Number, required: true},
        q7: {type: Number, required: true},
        q8: {type: Number, required: true},
        q9: {type: Number, required: true},
        q10: {type: Number, required: true},
        q11: {type: Number, required: true},
        q12: {type: Number, required: true},
        q14: {type: Number, required: true},
        q15: {type: Number, required: true},
        q16: {type: Number, required: true},
        q17: {type: Number, required: true},
        q18: {type: Number, required: true},
        q19: {type: Number, required: true},
        q20: {type: Number, required: true},
        q21: {type: Number, required: true},
        q22: {type: Number, required: true},
        q23: {type: Number, required: true},
        q24: {type: Number, required: true},
        q25: {type: Number, required: true} 
      }
    ],
    comment: {type: String, maxLength: 500},
    total: Number
  });
 
module.exports = mongoose.model("Checklist", checklistSchema);

