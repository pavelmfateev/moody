const mongoose = require("mongoose"),
    Checklist = require("../models/checklist.js"),
    numTotal = require("../routes/checklists");

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

// create seeds
const seedDB = async () => {
    await Checklist.deleteMany({});

    for (let i = 0; i < 50; i++) {
        const random4 = () => {return Math.floor(Math.random() * 5)};
        const newChecklist = {
            dateAdded: new Date(),
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

seedDB().then(() => {
    mongoose.connection.close();
})