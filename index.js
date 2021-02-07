// SETUP
const express = require("express"),
  app = express(),
  port = 3000,
  path = require("path"),
  methodOverride = require("method-override"),
  checklistsRoutes = require("./routes/checklists.js"),
  mongoose = require("mongoose"),
  ejsMate = require('ejs-mate');

mongoose.set("useFindAndModify", false);
mongoose
  .connect("mongodb://localhost:27017/depressionApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("OH NO ERROR");
    console.log(err);
  });

app.use(express.static(path.join(__dirname, "public")));
//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }));
// To parse incoming JSON in POST request body:
app.use(express.json());
// To 'fake' put/patch/delete requests:
app.use(methodOverride("_method"));
// Views folder and EJS setup:
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));



app.use('/checklists', checklistsRoutes);

// ROUTES
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
