const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
const rule = require("../src/textlint-rule-google-exclamation-points");
const URL = "\nhttps://developers.google.com/style/exclamation-points";
tester.run("textlint-rule-google-contractions", rule, {
    valid: ["Don't use exclamation points in text except when they're part of a code example."],
    invalid: [
        // single match
        {
            text: "Hey!",
            errors: [
                {
                    message: `Disallow to use "!".` + URL,
                    line: 1,
                    column: 4
                }
            ]
        },
        // multiple match in multiple lines
        {
            text: "Hey!?\nHey！？",
            errors: [
                {
                    message: `Disallow to use "!".` + URL,
                    line: 1,
                    column: 4
                },
                {
                    message: `Disallow to use "?".` + URL,
                    line: 1,
                    column: 5
                },
                {
                    message: `Disallow to use "！".` + URL,
                    line: 2,
                    column: 4
                },
                {
                    message: `Disallow to use "？".` + URL,
                    line: 2,
                    column: 5
                }
            ]
        },
        // multiple hit items in a line
        {
            text: "Hey!?",
            errors: [
                {
                    message: `Disallow to use "!".` + URL,
                    line: 1,
                    column: 4
                },
                {
                    message: `Disallow to use "?".` + URL,
                    line: 1,
                    column: 5
                }
            ]
        },
        // Allow Option: !
        {
            text: "Hey!?",
            options: {
                allowHalfWidthExclamation: true
            },
            errors: [
                {
                    message: `Disallow to use "?".` + URL,
                    line: 1,
                    column: 5
                }
            ]
        }
    ]
});
