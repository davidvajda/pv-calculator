const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 8080;

require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));

const AVAILABLE_RESOURCES = [
  "hooks.json",
  "invertors.json",
  "others.json",
  "rails.json",
  "defaultResources.json",
  "invertorStructure.json",
];

const checkEnvPassword = (pass) => {
  const servicePassword = process.env["SERVICE_PASSWORD"];
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

app.get("/get_available_resources", (req, res) => {
  res.json(AVAILABLE_RESOURCES);
  return;
});

app.post("/get_resource", (req, res) => {
  const resourceName = req.body["resourceName"];
  const adminPassword = req.body["adminPassword"]

  if (resourceName === undefined || !checkEnvPassword(adminPassword)) {
    res.sendStatus(400);
    return;
  }

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

// DONE ->  option to select 0 to 50% of invertor spare capacity
// DONE ->  option to make roof for x rows with x1, x2, x3.. xn panels
// DONE ->  back button on last page 
// DONE ->  map of load
// DONE ->  replace mcb with fuse holder + fuses
// DONE ->  spare rails
// DONE ->  add protection devices to resources
// DONE ->  add possibility to change panel
// DONE ->  change milimeters to meters in input fields
// DONE ->  add default contexts to resources
// DONE ->  add panel to resources
// DONE ->  fix bug when entering a float and , instead of .
// DONE ->  setup page protection devices and panel 
// DONE ->  don't allow user to continue if some fields are not filled
//          fix bug when adding more powerfull invertor e.g 25kW, brokes the app when selected
//          performance issue when holding power reserve
//          websupport hosting
// ############################################
// URGENT   replace all require reads from frontend with api calls to server.js