// MIT © 2017 azu
"use strict";
const fs = require("fs");
const path = require("path");
const packagesDirectory = path.join(__dirname, "../packages");
const blacklistModules = [];
const addPublishConfig = (pkg, updatablePkg) => {
    return Object.assign({}, pkg, updatablePkg);
};
/**
 * Add
 *
 * ```
 * "publishConfig": {
 *   "access": "public"
 * }
 * ```
 *
 * https://github.com/lerna/lerna/issues/914#issuecomment-318497928
 */
fs
    .readdirSync(packagesDirectory)
    .filter(pkgName => !blacklistModules.includes(pkgName))
    .sort()
    .map(pkgName => path.resolve(packagesDirectory, pkgName))
    .forEach(packageDirectory => {
        const packageJSONPath = path.join(packageDirectory, "package.json");
        console.log(packageJSONPath);
        const pkg = JSON.parse(fs.readFileSync(packageJSONPath, "utf-8"));
        const newPkg = addPublishConfig(pkg, {
            publishConfig: {
                access: "public"
            }
        });
        fs.writeFileSync(packageJSONPath, JSON.stringify(newPkg, null, 2), "utf-8");
    });
