// MIT © 2017 azu
"use strict";
const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
const rule = require("../src/textlint-rule-google-units-of-measure");
tester.run("textlint-rule-google-units-of-measure.js", rule, {
    valid: [
        "Recommended: 64 GB is OK.",
        "Recommended: 2 TB is OK.",
        "Recommended: $10 is OK.",
        "Recommended: £25 is OK.",
        "Recommended: 50° is OK.",
        "Recommended: 65% is OK.",
        "Recommended: On this plan, you are limited to 55k download operations and 20k upload operations per day."
    ],
    invalid: [
        // need space
        {
            text: "Not recommended: 64GB should be 64 GB.",
            output: "Not recommended: 64 GB should be 64 GB.",
            errors: [{}]
        },
        // No space
        {
            text: "This is $ 10.",
            output: "This is $10.",
            errors: [{}]
        },
        {
            text: "This is 50 °.",
            output: "This is 50°.",
            errors: [{}]
        },

        // Don't put a space between the number and "k".
        {
            text: "On this plan, you are limited to 55 k download operations and 20k upload operations per day.",
            output: "On this plan, you are limited to 55k download operations and 20k upload operations per day.",
            errors: [{}]
        }
    ]
});
