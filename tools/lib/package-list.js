// MIT © 2017 azu
"use strict";
const fs = require("fs");
const path = require("path");
const packagesDirectory = path.join(__dirname, "../../packages");
module.exports.getPackages = (blacklistModules = []) => {
    return fs
        .readdirSync(packagesDirectory)
        .filter(pkgName => !blacklistModules.includes(pkgName))
        .sort()
        .map(pkgName => path.resolve(packagesDirectory, pkgName));
};
