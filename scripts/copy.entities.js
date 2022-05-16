"use strict";

const path = require("path");
const fs = require("fs");
const { toCamelCase, capitalize } = require("./utils/to.cases");
const { getServiceFiles, appsLocation } = require("./utils/get.services");
const destination = path.resolve(__dirname, "../packages/entities/src");

/**
 * clean up code content
 * @param {string} content
 * @returns {string} cleaned content
 */
function fixSchemaContent(content) {
  const lines = content.split("\n");
  /**
   * @type {string[]}
   */
  const cleanedContent = [];
  let removeNextLine = false;
  for (const line of lines) {
    let newLine = line.trim();
    const startPad = line.match("[a-zA-Z]");
    const isImport = newLine.startsWith("import");
    const isDecorator = newLine.startsWith("@");

    if (isImport) {
      continue;
    } else if (isDecorator && !removeNextLine) {
      if (newLine.endsWith("{")) {
        removeNextLine = true;
      }

      continue;
    } else if (removeNextLine) {
      if (newLine.startsWith("}")) {
        removeNextLine = false;
      }

      continue;
    }

    const isObjectId = newLine.endsWith("ObjectId;");
    if (isObjectId) {
      const start = newLine.indexOf(":");
      newLine = newLine.substring(0, start) + ": string;";
    }

    if (startPad) {
      const leftPad = "".padStart(startPad.index, " ");
      newLine = leftPad + newLine;
    }

    if (newLine.includes("BaseSchema")) {
      newLine = newLine.replace(/BaseSchema/g, "BaseEntity");
    }

    newLine = newLine.replace(/Schema/g, "");
    cleanedContent.push(newLine);
  }

  if (cleanedContent[0] !== "") {
    cleanedContent.unshift("");
  }

  cleanedContent.unshift("import { BaseEntity } from '../base';");

  return cleanedContent.join("\n");
}

async function run() {
  const servApps = getServiceFiles();

  /**
   * @type {string[]}
   */
  const mainIndex = [];
  const mainIndexLoc = path.resolve(destination, "index.ts");
  for (const servApp of servApps) {
    const servLoc = path.resolve(appsLocation, servApp);
    const entitiesLoc = path.resolve(servLoc, "src/entities");
    const hasEntities = fs.existsSync(entitiesLoc);
    if (!hasEntities) {
      continue;
    }

    const entities = fs.readdirSync(entitiesLoc);
    const serviceEntityLoc = path.resolve(destination, servApp);
    const serviceIndexLoc = path.resolve(destination, servApp, "index.ts");
    /**
     * @type {string[]}
     */
    const serviceIndex = [];

    if (fs.existsSync(serviceEntityLoc)) {
      console.warn("Removing", serviceEntityLoc);
      fs.rmdirSync(serviceEntityLoc, { recursive: true });
    }

    fs.mkdirSync(serviceEntityLoc);

    for (const entity of entities) {
      const schemaLoc = path.resolve(entitiesLoc, entity, "schema.ts");
      const schemaContent = fs.readFileSync(schemaLoc, { encoding: "utf-8" });
      const cleanedContent = fixSchemaContent(schemaContent);
      const newLoc = path.resolve(serviceEntityLoc, entity) + ".ts";
      fs.writeFileSync(newLoc, cleanedContent, { encoding: "utf-8" });
      serviceIndex.push(`export * from './${entity}'`);
      console.warn("Wrote to", entity);
    }

    mainIndex.push(
      `export * as ${capitalize(toCamelCase(servApp))} from './${servApp}'`
    );

    fs.writeFileSync(serviceIndexLoc, serviceIndex.join("\n"), {
      encoding: "utf-8",
    });
  }

  fs.writeFileSync(mainIndexLoc, mainIndex.join("\n"), {
    encoding: "utf-8",
  });

  console.warn("Entities copied");
  process.exit(0);
}

run();
