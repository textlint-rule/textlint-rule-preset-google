// MIT © 2017 azu
"use strict";
const TextLintTester = require("textlint-tester");
const rule = require("../src/textlint-rule-google-sentence-spacing");
const tester = new TextLintTester();
tester.run("textlint-rule-google-sentence-spacing", rule, {
    valid: [
        "sentence is 1. sentence 2. sentence 3.",
        "sentence is 1.\nsentence 2.\nsentence 3.",
        "sentence is 1.\n sentence 2.\n sentence 3.",
        "> sentence is 1.     sentence 2.",
        "This is ` obj.value   = 1;  `.",
        "[   .   .   . link is ok    .     .     . ](http://example.com)",
        "# Allow first and last spaces ",
        "  sentence is 1. sentence 2. sentence 3.",
        "sentence is 1. sentence 2. sentence 3.  ",
        "  sentence is 1. sentence 2. sentence 3.  "
    ],
    invalid: [
        {
            text: "There are two sentence.  But have two space.",
            output: "There are two sentence. But have two space.",
            errors: [{}]
        },
        {
            text: "sentence is 1.  sentence 2.  sentence 3.",
            output: "sentence is 1. sentence 2. sentence 3.",
            errors: [{}, {}]
        }
    ]
});
