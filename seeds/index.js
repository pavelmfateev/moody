const mongoose = require("mongoose"),
    Checklist = require("../models/checklist.js"),
    numTotal = require("../routes/checklists"),
    moment = require("moment");

// Connect to database
mongoose.set("useFindAndModify", false);
mongoose
  .connect("mongodb://localhost:27017/depressionApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
// let formatted_date = moment(checklists[property].dateAdded).format("YYYY-MM-DD");
// create seeds
const seedDB = async () => {
    await Checklist.deleteMany({});
    let dateArr = [];
    for(let i = 0; i< 50; i++){
        dateArr[i] = randomDate(new Date(2020, 0, 1), new Date());    
    }
    dateArr.sort((a,b)=>a.getTime()-b.getTime());

    // console.log(dateArr);
    
    for (let i = 0; i < 50; i++) {
        const random4 = () => {return Math.floor(Math.random() * 5)};
        const newChecklist = {
            dateAdded: dateArr[i],
        answers: {},
        comment: "comment",
        total: 0,
        };
        for(let i = 0; i <= 25; i++){
            let q = 'q';
            newChecklist.answers[`${q + i}`] = random4();
        }
        const answers = newChecklist.answers;
        for (let property in answers){
            answers[property] = random4();
        }
        newChecklist.total = numTotal(newChecklist.answers);
        let createCheck = new Checklist(newChecklist);
        await createCheck.save();
    }
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

seedDB().then(() => {
    mongoose.connection.close();
})