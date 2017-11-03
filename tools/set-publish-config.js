// MIT © 2017 azu
"use strict";
const fs = require("fs");
const path = require("path");
const getPackages = require("./lib/package-list").getPackages;
const updatePackage = (pkg, updatablePkg) => {
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
getPackages().forEach(packageDirectory => {
    const packageJSONPath = path.join(packageDirectory, "package.json");
    const pkg = JSON.parse(fs.readFileSync(packageJSONPath, "utf-8"));
    const newPkg = updatePackage(pkg, {
        publishConfig: {
            access: "public"
        }
    });
    fs.writeFileSync(packageJSONPath, JSON.stringify(newPkg, null, 2), "utf-8");
});
