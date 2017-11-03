// LICENSE : MIT
"use strict";
const assert = require("assert");
const rules = require("../src/textlint-rule-preset-google").rules;
const rulesConfig = require("../src/textlint-rule-preset-google").rulesConfig;
describe("textlint-rule-preset-google", function() {
    it("should not have missing key", function() {
        const ruleKeys = Object.keys(rules).sort();
        const ruleConfigKeys = Object.keys(rulesConfig).sort();
        assert.deepEqual(ruleKeys, ruleConfigKeys);
    });
});
