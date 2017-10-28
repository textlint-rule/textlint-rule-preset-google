// MIT © 2017 azu
"use strict";
const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
const rule = require("../src/textlint-rule-google-hyphens");
tester.run("textlint-rule-google-hyphens", rule, {
    valid: ["The app uses Android-specific techniques.", "The app uses techniques that are Android specific."],
    invalid: [
        // Adverbs ending in "ly"
        {
            text: "Free, simple, and publicly-available implementations",
            output: "Free, simple, and publicly available implementations",
            errors: [
                {
                    index: 18
                }
            ]
        },
        {
            text: "To get profile information for the currently-authorized user",
            output: "To get profile information for the currently authorized user",
            errors: [
                {
                    index: 35
                }
            ]
        },
        //Range of numbers
        {
            text: "from 8-20 files",
            output: "8-20 files",
            errors: [{}]
        },
        {
            text: "between 8-20 files",
            output: "8-20 files",
            errors: [{}]
        }
    ]
});
