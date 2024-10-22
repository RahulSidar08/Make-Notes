// we are going to make a note taking web application



const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  // this is how file showing is handled
  fs.readdir(`./files`, function (err, files) {
    res.render("index", { files });
  });
});

app.post("/create", function (req, res) {
  // console.log(req.body)
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    function (err) {
      res.redirect("/");
    }
  );
});

app.get("/file/:filename", function (req, res) {
  // reading file data
  fs.readFile(
    `./files/${req.params.filename}`,
    "utf-8",
    function (err, filedata) {
      // console.log(filedata);
      // res.render("show");
      // console.log(req.params.filename)
      // console.log(req.body)
      res.render("show", { filename: req.params.filename, filedata: filedata });
    }
  );
});

// edit files Or Rename the file
app.get("/edit/:filename", function (req, res) {
  fs.readFile(
    `./files/${req.params.filename}`,
    "utf-8",
    function (err, filedata) {
      // console.log(filedata);
      // res.render("show");
      // console.log(req.params.filename)
      // console.log(req.body)
      res.render("edit", { filename: req.params.filename, filedata: filedata });
    })
});

app.post("/editName", function (req, res) {
  // console.log(req.body)
  fs.rename(
    `./files/${req.body.previous}`,
    `./files/${req.body.new}`,
    function (err) {
      res.redirect("/");
    }
  );
});

app.post("/editData", function (req, res) {
  fs.appendFile(
    `./files/${req.body.previous}`,
    `${req.body.newDetails}`,
    function (err) {
      if(err) throw err
      res.redirect("/");
    }
  );
});

app.get("/delete/:filename", function (req, res) {
  console.log()
  res.render("delete", { filename: req.params.filename });
});

app.post("/delete", function (req, res) {
  fs.unlink(`./files/${req.body.previous}`, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/");
  });
});

app.listen(3000);



