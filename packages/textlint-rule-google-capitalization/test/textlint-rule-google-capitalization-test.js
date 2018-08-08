// MIT © 2017 azu
"use strict";
const TextLintTester = require("textlint-tester");
const rule = require("../src/textlint-rule-google-capitalization");
const tester = new TextLintTester();
tester.run("textlint-rule-google-capitalization", rule, {
    valid: [
        "A proper noun.",
        "A quotation.",
        "An item in a bulleted, numbered, or definition list.",
        "Text that follows a label, such as a Caution or Note.",
        "A subheading on the same line as a heading."
    ],
    invalid: [
        {
            text: "in text, follow the standard capitalization rules for American English",
            output: "In text, follow the standard capitalization rules for American English",
            errors: [
                {
                    index: 0,
                    message:
                        "Paragraph: Follow the standard capitalization rules for American English.\n" +
                        "See https://owl.english.purdue.edu/owl/resource/592/01/\n" +
                        "https://developers.google.com/style/capitalization"
                }
            ]
        },
        {
            text: "first, sentence should be capital. second, sentence should be capital.",
            output: "First, sentence should be capital. Second, sentence should be capital.",
            errors: [
                {
                    index: 0
                },
                {
                    index: 35
                }
            ]
        },
        {
            text: "# capitalization in titles and headings",
            output: "# Capitalization in titles and headings",
            errors: [
                {
                    index: 2
                }
            ]
        },
        {
            text: `
- a proper noun.
- a quotation.
- an item in a bulleted, numbered, or definition list.
- text that follows a label, such as a Caution or Note.
- a subheading on the same line as a heading.
`,
            output: `
- A proper noun.
- A quotation.
- An item in a bulleted, numbered, or definition list.
- Text that follows a label, such as a Caution or Note.
- A subheading on the same line as a heading.
`,
            errors: [{}, {}, {}, {}, {}]
        },
        {
            text: "![image](http://exmaple.com) is not capital.",
            errors: [
                {
                    index: 0
                }
            ]
        }
    ]
});
