"use strict";

const path = require("path");
const fs = require("fs");

const appsLocation = path.resolve(__dirname, "../../apps");
const servName = "serv.";

function getServiceFiles() {
  const servApps = fs
    .readdirSync(appsLocation)
    .filter((item) => item.startsWith(servName));

  return servApps;
}

module.exports = {
  getServiceFiles,
  appsLocation,
};
