const express = require("express");
const cors = require("cors");
const db = require("./models");
const path = require ('path');

// const router = require("./routes/lanza.routes");




const app = express();

app.use(express.static(path.join(__dirname, '..','client', 'build')));




db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});


var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to lanza-libre application." });
});


// set port, listen for requests
require("./routes/posts.routes")(app);
require("./routes/users.routes")(app);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});