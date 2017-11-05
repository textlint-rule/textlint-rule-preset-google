// MIT © 2017 azu
"use strict";
const fs = require("fs");
const path = require("path");
const getPackages = require("./lib/package-list").getPackages;
const blacklistModules = ["textlint-report-helper-for-google-preset", "textlint-rule-preset-google"];
const updatePackage = (pkg, dependencies) => {
    const updatedDependencies = Object.assign({}, pkg.dependencies, dependencies);
    return Object.assign({}, pkg, {
        dependencies: updatedDependencies
    });
};
/**
 * Update textlint-rule-preset-google
 */
const packageNames = getPackages(blacklistModules).map(packageDirectory => {
    const packageJSONPath = path.join(packageDirectory, "package.json");
    const pkg = JSON.parse(fs.readFileSync(packageJSONPath, "utf-8"));
    return pkg.name;
});

/**
 * create "dependencies"
 * @param packageNames
 * @param version
 * @returns {{}}
 */
const createRuleDependencies = (packageNames, version) => {
    const dependencies = {};
    packageNames.forEach(packageName => {
        dependencies[packageName] = `^${version}`;
    });
    return dependencies;
};
/**
 * create "rules" and "rulesConfig" module source text
 * @param packageNames
 */
const createRuleAndConfig = packageNames => {
    const rules = {};
    const rulesConfig = {};
    packageNames.forEach(packageName => {
        const shortName = packageName.replace("@textlint-rule/textlint-rule-google-", "");
        rules[shortName] = `require("${packageName}")`;
        rulesConfig[shortName] = true;
    });
    return `module.exports = ${JSON.stringify(
        {
            rules,
            rulesConfig
        },
        null,
        4
    )};
`.replace(/"require\(\\"(.*)\\"\)"/g, `require("$1")`);
};

const monorepoVersion = require("../lerna.json").version;
const packagesDirectory = path.join(__dirname, "../packages");
// package.json
console.info("Start to update package.json");
const rulePresetPkgPath = path.join(packagesDirectory, "textlint-rule-preset-google/package.json");
const rulePresetPkg = require(rulePresetPkgPath);
const ruleDependencies = createRuleDependencies(packageNames, monorepoVersion);
const newRulePresetPkg = updatePackage(rulePresetPkg, ruleDependencies);
fs.writeFileSync(rulePresetPkgPath, JSON.stringify(newRulePresetPkg, null, 2), "utf-8");
console.info("Updated package.json");
// src
console.info("Start to src/textlint-rule-preset-google.js");
const srcPath = path.join(packagesDirectory, "textlint-rule-preset-google/src/textlint-rule-preset-google.js");
const srcContent = createRuleAndConfig(packageNames);
fs.writeFileSync(srcPath, srcContent, "utf-8");
console.info("Updated package.json");
