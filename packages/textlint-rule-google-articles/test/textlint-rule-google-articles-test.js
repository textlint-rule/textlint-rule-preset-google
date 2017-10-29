// MIT © 2017 azu
"use strict";
const TextLintTester = require("textlint-tester");
const rule = require("../src/textlint-rule-google-articles");
const tester = new TextLintTester();
tester.run("textlint-rule-google-", rule, {
    valid: [
        "An hour.",
        "An HTML file.",
        "A hand.",
        "A hotel.",
        "An umbrella.",
        "A union.",
        "An SQL (database)",
        "This is An FAQ.",
        {
            text: "This is a FAQ.",
            options: {
                a: ["FAQ"]
            }
        }
    ],
    invalid: [
        // multiple
        {
            text: "This is an pen.",
            output: "This is a pen.",
            errors: [
                {
                    index: 8
                }
            ]
        },
        {
            text: "This is an pen. This is not A umbrella",
            output: "This is a pen. This is not An umbrella",
            errors: [
                {
                    index: 8
                },
                {
                    index: 28
                }
            ]
        }
    ]
});
