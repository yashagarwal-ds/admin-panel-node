const express = require("express");
const app = express();
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const user_router = require("./routes/employeeRoute");
const PORT = 8000;

connectDB();

app.use(express.static(__dirname + '/public/userImages'));

// app.get("/", (req, res) => {
//     res.send("This is from home side");
// });

app.use("/", user_router);

app.listen(PORT, () => console.log("This is listening port from", PORT));