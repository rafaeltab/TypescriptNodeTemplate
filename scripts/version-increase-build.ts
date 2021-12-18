import { readFileSync, writeFileSync } from "fs";
import * as semver from "semver";

var res = readFileSync("package.json", {
    encoding: "utf8"
});

var packagejson = JSON.parse(res);
var oldVersion = packagejson.version;
var versionParsed = semver.parse(oldVersion, {
    loose: false,
    includePrerelease: true
});

var newVersionFormatted = `${versionParsed.major}.${versionParsed.minor}.${versionParsed.patch}+${parseInt(versionParsed.build[0])+1}`;

console.log(`Increasing version from ${oldVersion} to ${newVersionFormatted}`);

packagejson.version = newVersionFormatted;
writeFileSync("package.json", JSON.stringify(packagejson, null, 4));