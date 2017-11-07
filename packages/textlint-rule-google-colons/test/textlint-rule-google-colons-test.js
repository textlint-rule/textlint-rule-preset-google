// MIT © 2017 azu
"use strict";
const TextLintTester = require("textlint-tester");
const rule = require("../src/textlint-rule-google-colons");
const tester = new TextLintTester();
tester.run("textlint-rule-google-colons", rule, {
    valid: [
        // Introductory phrase preceding colon
        `The fields are defined as follows:
    
- one
- two
`,
        // Bold text preceding colon
        "**Tone:** concise, conversational, friendly, respectful.",
        "**Tone** is bold: concise, conversational, friendly, respectful.",
        `When you add or update content to an existing project, remember to take these steps: review the style guide; use checklists; enlist a fellow writer or an editor to copyedit your work; and request a developmental edit if you feel that it's warranted.`
    ],
    invalid: [
        {
            text: "The fields are:",
            errors: [
                {
                    message: `The text that precedes the colon must be able to stand alone as a complete sentence.
https://developers.google.com/style/colons#introductory-phrase-preceding-colon
`
                }
            ]
        },
        {
            text: "- The fields are:",
            errors: [{}]
        },
        {
            text: "This is:",
            errors: [
                {
                    message: `The text that precedes the colon must be able to stand alone as a complete sentence.
https://developers.google.com/style/colons#introductory-phrase-preceding-colon
`
                }
            ]
        },
        // Bold text preceding colon
        {
            text: "**Tone**: concise, conversational, friendly, respectful.",
            output: "**Tone:** concise, conversational, friendly, respectful.",
            errors: [{}, {}]
        },
        {
            text: "This is **keyword**: it is ok",
            output: "This is **keyword:** it is ok",
            errors: [{}, {}]
        },
        // Colons within sentences
        {
            text: "Tone: Concise, conversational, friendly, respectful.",
            errors: [
                {
                    message: `In general, the first word in the text that follows a colon should be in lowercase.
https://developers.google.com/style/colons#colons-within-sentences
`
                }
            ]
        }
    ]
});
