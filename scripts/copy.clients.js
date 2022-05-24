"use strict";

const path = require("path");
const fs = require("fs");
const { getServiceFiles, appsLocation } = require("./utils/get.services");
const { toCamelCase, capitalize } = require("./utils/to.cases");
const destination = path.resolve(__dirname, "../packages/serv.clients/src");
const protobufTarget = path.resolve(destination, "protobuf");
const clientTarget = path.resolve(destination, "clients");

/**
 * @param {string} servApp
 */
function writeClientFile(servApp) {
  const stripped = servApp.replace("serv.", "");
  const allCaps = stripped.replace(".", "_").toUpperCase();
  const startCase = capitalize(toCamelCase(stripped));

  const template = `
import { GrpcClient, RpcClient, Service } from '@nestcloud2/grpc';
import {
  ${allCaps}_SERVICE_NAME,
  ${startCase}ServiceClient,
  protobufPackage,
} from '../protobuf/${servApp}';

import { Injectable } from '@nestjs/common';
import path from 'path';

const protoPath = path.resolve(
  __dirname,
  '../protobuf',
  '${servApp}',
  '${stripped}.proto',
);

@Injectable()
export class ${startCase}RpcClientService {
  @RpcClient({
    service: protobufPackage,
    package: protobufPackage,
    protoPath,
  })
  public readonly client!: GrpcClient;

  @Service(${allCaps}_SERVICE_NAME, {
    service: protobufPackage,
    package: protobufPackage,
    protoPath,
  })
  public svc!: ${startCase}ServiceClient;
}
`;

  fs.writeFileSync(
    path.resolve(clientTarget, `${servApp}.client.ts`),
    template.replace("\n", ""),
    { encoding: "utf-8" }
  );
}

function run() {
  /**
   * @type {string[]}
   */
  const protoBufIndex = [];
  const clientsIndex = [];
  const entryIndex = [];
  const servApps = getServiceFiles();

  if (fs.existsSync(protobufTarget)) {
    console.warn("Removing", protobufTarget);
    fs.rmdirSync(protobufTarget, { recursive: true });
  }

  if (fs.existsSync(clientTarget)) {
    console.warn("Removing", clientTarget);
    fs.rmdirSync(clientTarget, { recursive: true });
  }

  fs.mkdirSync(protobufTarget);
  fs.mkdirSync(clientTarget);
  console.info("Created", [clientTarget, protobufTarget]);

  for (const servApp of servApps) {
    const servLoc = path.resolve(appsLocation, servApp);
    const servAppProtoDir = path.resolve(servLoc, "src", "rpc", "protobuf");
    if (!fs.existsSync(servAppProtoDir)) {
      continue;
    }

    /**
     * @type {string[]}
     */
    const servProtoIndex = [];
    const protobufList = fs.readdirSync(servAppProtoDir);
    const servProtoDir = path.resolve(protobufTarget, servApp);

    if (fs.existsSync(servProtoDir)) {
      console.warn("Removing", servApp);
      fs.rmdirSync(servProtoDir, { recursive: true });
    }

    fs.mkdirSync(servProtoDir);
    console.info("Created", servProtoDir);

    for (const item of protobufList) {
      const contentLoc = path.resolve(servAppProtoDir, item);
      const content = fs.readFileSync(contentLoc, { encoding: "utf-8" });
      const itemPath = path.resolve(protobufTarget, servApp, item);

      console.info("Created", servApp, item);
      fs.writeFileSync(itemPath, content, { encoding: "utf-8" });

      if (item.endsWith(".ts")) {
        const extIndex = item.indexOf(".ts");
        servProtoIndex.push(
          `export * from './${item.substring(0, extIndex)}';`
        );
      }
    }

    servProtoIndex.push("");
    writeClientFile(servApp);

    fs.writeFileSync(
      path.resolve(servProtoDir, "index.ts"),
      servProtoIndex.join("\n"),
      { encoding: "utf-8" }
    );

    clientsIndex.push(`export * from './${servApp}.client';`);
    protoBufIndex.push(
      `export * as ${capitalize(toCamelCase(servApp))} from './${servApp}';`
    );
  }

  clientsIndex.push("");
  protoBufIndex.push("");

  entryIndex.push("export * from './clients';");
  entryIndex.push("export * from './protobuf';");
  entryIndex.push("");

  fs.writeFileSync(
    path.resolve(protobufTarget, "index.ts"),
    protoBufIndex.join("\n"),
    { encoding: "utf-8" }
  );

  fs.writeFileSync(
    path.resolve(clientTarget, "index.ts"),
    clientsIndex.join("\n"),
    { encoding: "utf-8" }
  );

  fs.writeFileSync(
    path.resolve(destination, "index.ts"),
    entryIndex.join("\n"),
    { encoding: "utf-8" }
  );
}

run();
