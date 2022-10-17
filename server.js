const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const port = process.env.PORT || 8080;

require('dotenv').config()

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/s", (req, res) => {
  const fs = require("fs");

  res.sendFile(path.join(__dirname, "setup", "setup.html"))
})

app.post("/auth", (req, res) => {
  const servicePassword = process.env["SERVICE_PASSWORD"]
  console.log("Got password: ", req.body)

  res.send("OK")

})

app.listen(port);
console.log("Server listening at port "  + port)

// option to reset to defaultResources
// option to change resources
// option to add // delete invertors
// option to select 0 to 50% of invertor spare capacity
// option to make roof for x rows with x1, x2, x3.. xn panels

