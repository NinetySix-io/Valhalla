const { exec } = require("child_process");
const util = require("util");
const path = require("path");
const fs = require("fs");

const promiseExec = util.promisify(exec);
const appsPath = path.resolve(__dirname, "..", "apps");

/**
 * @param {string} rootPath
 * @returns {{
 *  isFromApps: boolean
 *  apps: string[]
 * }}
 */
function getApps(rootPath) {
  const cleaned = rootPath.replace("\n", "");
  if (cleaned.includes("apps/serv.")) {
    return {
      isFromApps: true,
      apps: [cleaned.split("/").pop()],
    };
  }

  const apps = fs
    .readdirSync(appsPath)
    .filter((app) => app.startsWith("serv."));

  return {
    isFromApps: false,
    apps,
  };
}

promiseExec("pwd").then(async (output) => {
  const apps = getApps(output.stdout);

  for await (const app of apps.apps) {
    const rpcPath = path.resolve(appsPath, app, "src", "protobuf");
    if (!fs.existsSync(path.resolve(rpcPath))) {
      continue;
    }

    const opt = Object.entries({
      nestJs: true,
      esModuleInterop: true,
      stringEnums: true,
      env: "node",
      useOptionals: "messages",
      unrecognizedEnum: false,
      useObjectId: true,
    })
      .map(([key, value]) => `${key}=${value}`)
      .join(",");

    const cmd = [
      "protoc",
      "--ts_proto_out=.",
      apps.isFromApps ? "./src/**/*.proto" : `./apps/${app}/src/**/*.proto`,
      `--ts_proto_opt=${opt}`,
    ];

    const result = await promiseExec(cmd.join(" "));
    result.stderr
      ? console.error(result.stderr)
      : console.warn(`Proto definition file generated for ${app}`);
  }
});
