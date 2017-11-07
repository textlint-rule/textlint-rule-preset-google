// MIT © 2017 azu
"use strict";
const TextLintTester = require("textlint-tester");
const rule = require("../src/textlint-rule-google-plurals-parentheses");
const tester = new TextLintTester();
tester.run("textlint-rule-google-plurals-parentheses", rule, {
    valid: [
        "To find your API key, visit the Credentials page.",
        "The value of the parent depends on the values of its children."
    ],
    invalid: [
        {
            text: "To find your API key(s), visit the Credentials page.",
            errors: [
                {
                    index: 17
                }
            ]
        },
        {
            text: "The value of the parent depends on the value(s) of its child(ren).",
            errors: [
                {
                    index: 39
                },
                {
                    index: 55
                }
            ]
        }
    ]
});
