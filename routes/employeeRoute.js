const express = require("express");
const user_router = express();
const {
  createEmployee,
  loadLogin,
  loginEmployee
} = require("../controllers/employeeController");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

user_router.use(bodyParser.json());
user_router.use(bodyParser.urlencoded({ extended: true }));

user_router.set("view engine", "ejs");
user_router.set("views", "./views/users");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/userImages"));
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

user_router.get("/register", (req, res) => {
  res.render("register");
});

user_router.post("/register", upload.single("image"), createEmployee);

user_router.get("/", loadLogin);

user_router.post("/", loginEmployee);

module.exports = user_router;
