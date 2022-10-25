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
  const defaults = require("../resources/defaultResources.json");

  const hooks = defaults.hooks;
  const rails = defaults.rails;
  const others = defaults.others;

  writeFile("hooks.json", hooks);
  writeFile("rails.json", rails);
  writeFile("others.json", others);
};

app.get("/", (req, res) => {
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

  if (
    resourceName === undefined ||
    !AVAILABLE_RESOURCES.includes(resourceName)
  ) {
    res.sendStatus(400);
    return;
  }

  const resource = readFile(`./src/resources/${resourceName}`)
  res.json(resource);
});

app.post("/set_resource", (req, res) => {
  const resourceName = req.body["resourceName"];

  if (
    resourceName === undefined ||
    !AVAILABLE_RESOURCES.includes(resourceName)
  ) {
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

app.post("reset_resources", (req, res) => {
  const adminPassword = req.body["adminPassword"];

  if (adminPassword === undefined) {
    res.sendStatus(400);
    return;
  }

  resetResources();
  res.sendStatus(200);
  return;
});

app.listen(port);
console.log("Server listening at port " + port);

// option to reset to defaultResources
// option to change resources
// option to add // delete invertors
// option to select 0 to 50% of invertor spare capacity
// option to make roof for x rows with x1, x2, x3.. xn panels
// back button on last page
// map of load
// replace mcb with fuse holder + fuses
// spare rails

// 2x8 panels uncorrect material amounts
//dcInputs make into array
// save the invertors
// parse ints when creating new invertor
// when adding or deleting invertor modify modifiedInvertors so it stays at the same invertor
