import { readFileSync, writeFileSync } from "fs";
import * as semver from "semver";

var res = readFileSync("package.json", {
    encoding: "utf8"
});

var packagejson = JSON.parse(res);
var oldVersion = packagejson.version;
var newVersion = semver.parse(oldVersion, {
    loose: false,
    includePrerelease: true
}).inc("minor");

var newVersionFormatted = `${newVersion.major}.${newVersion.minor}.${newVersion.patch}+${newVersion.build}`;

console.log(`Increasing version from ${oldVersion} to ${newVersionFormatted}`);

packagejson.version = newVersionFormatted;
writeFileSync("package.json", JSON.stringify(packagejson, null, 4));