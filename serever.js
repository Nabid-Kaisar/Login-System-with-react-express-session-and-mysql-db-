//importing modules

const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
var cookieParser = require("cookie-parser");
var session = require("express-session");

// using middlewares
app.use(cookieParser());

app.use(require("body-parser").json());

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(
  session({
    secret: "keyboard",
    resave: false,
    saveUninitialized: true,
    cookie: { expires: new Date(253402300000000) }
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "logintest"
});

//Create DATA From Reqest Body
app.post("/postRegisterInfo", (req, res) => {
  let post = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };
  let sql = "INSERT INTO userdata SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      res.json({ success: false, message: "Could not create User" });
    }
    console.log(result);
    res.json({ success: true, message: "New User added" });
  });
});

app.post("/postLoginInfo", (req, res) => {
  let uname = req.body.username;
  let pass = req.body.password;
  let sql = `SELECT username,password,email FROM userdata WHERE username = "${uname}"`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    const fetchedUserName = results[0];
    console.log(results[0]);
    if (results[0].password === pass) {
      //req.session.success = true;

      req.session.user = {
        username: fetchedUserName
      };
      //  res.send(req.session.user);
      res.send({
        success: true
      });
      // res.redirect('/');
    } else {
      res.send("wrong usrename or password");
    }

    // res.send({
    //   success:true,
    //   data : results
    // });
  });
});

// //anik's code
// app.post("/login", (req, res) => {
//   if (req.body.name == "anik" && req.body.password == "1234") {
//     //tui eikhane amar moto na koira tor database onujayi emne use korte paros
//     //const fetchedUsername = result[0].username;
//     const fetchedUsername = req.body.name;
//     req.session.user = {
//       username: fetchedUsername
//     };
//     res.send({
//       success: true
//     });
//   }
// });

app.get("/dashboard", function(req, res, next) {
  // console.log(req.session.user);
  // console.log("getting access on user route", req.session.user.username);
  res.send({
    name: req.session.user.username
  });
});

app.get("/secret", (req, res, next) => {
  console.log(req.session.user);
  if (req.session.user) {
    //res.send("You are logged IN")
    res.send({
      name: req.session.user.username
    });
  } else {
    res.send("Please login to continue");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy(function(err){
    if (err) throw err;
    res.send("You have been logged out of your session. Please login to contiune");

  });
});

app.listen("5000", () => {
  console.log("Server started on port 5000");
});
