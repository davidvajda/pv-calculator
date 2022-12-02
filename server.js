const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 8080;

require("dotenv").config();

const app = express();

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));

const checkEnvPassword = (pass) => {
  const servicePassword = process.env["REACT_APP_SERVICE_PASSWORD"];
  return servicePassword === pass ? true : false;
};

const writeFile = (fileName, fileContent) => {
  fs.writeFile(
    `./src/resources/${fileName}`,
    JSON.stringify(fileContent),
    (err) => {
      if (err) throw err;
    }
  );
};

const readFile = (fileName) => {
  try {
    return JSON.parse(fs.readFileSync(fileName, "utf-8"));
  } catch (err) {
    console.log(err);
    return {};
  }
};

const resetResources = () => {
  const defaults = readFile(`./src/resources/defaultResources.json`)

  const hooks = defaults.hooks;
  const rails = defaults.rails;
  const others = defaults.others;
  const protectionDevices = defaults.protectionDevices;
  const panel = defaults.panel;

  writeFile("hooks.json", hooks);
  writeFile("rails.json", rails);
  writeFile("others.json", others);
  writeFile("protectionDevices.json", protectionDevices);
  writeFile("panel.json", panel);
};

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.post("/authenticate", (req, res) => {
  const adminPassword = req.body["adminPassword"];
  if (!checkEnvPassword(adminPassword)) {
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});


app.post("/get_resource", (req, res) => {
  const resourceName = req.body["resourceName"];
  const resource = readFile(`./src/resources/${resourceName}`);
  res.json(resource);
});

app.post("/set_resource", (req, res) => {
  const resourceName = req.body["resourceName"];

  if (resourceName === undefined) {
    res.sendStatus(400);
    return;
  }

  const resourceContent = req.body["resourceContent"];
  const adminPassword = req.body["adminPassword"];

  if (resourceContent === undefined || !checkEnvPassword(adminPassword)) {
    res.sendStatus(400);
    return;
  }

  writeFile(resourceName, resourceContent);
  res.sendStatus(200);
  return;
});

app.post("/reset_resources", (req, res) => {
  const adminPassword = req.body["adminPassword"];

  if (adminPassword === undefined || !checkEnvPassword(adminPassword)) {
    res.sendStatus(400);
    return;
  }

  resetResources();
  res.sendStatus(200);
  return;
});

app.listen(port);
console.log("Server listening at port " + port);