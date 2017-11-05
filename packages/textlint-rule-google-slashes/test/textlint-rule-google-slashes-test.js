// MIT © 2017 azu
"use strict";
const TextLintTester = require("textlint-tester");
const rule = require("../src/textlint-rule-google-slashes");
const tester = new TextLintTester();
tester.run("textlint-rule-google-slashes", rule, {
    valid: [
        "For example, a disaster relief map is not subject to the usage limits even if it has been developed and is hosted by a commercial entity.",
        "For example, a disaster relief map is not subject to the usage limits even if it has been developed or is hosted by a commercial entity.",
        "Call this method five or six times.",
        "This is link.\nThat is ignored.\nThis is <https://developers.google.com/cardboard/>",
        "¾",
        "0.75",
        "75%",
        "care of, with",
        // Allow to write URL and link
        "This is https://github.com/almin/almin/tree/master/examples/todomvc",
        "- https://github.com/almin/almin/tree/master/examples/todomvc\n",
        '- [almin/examples/counter/test at master · almin/almin](https://github.com/almin/almin/tree/master/examples/counter/test "almin/examples/counter/test at master · almin/almin")',
        '[almin/examples/counter/test at master · almin/almin](https://github.com/almin/almin/tree/master/examples/counter/test "almin/examples/counter/test at master · almin/almin")'
    ],
    invalid: [
        // Slashes with alternatives
        {
            text:
                "For example, a disaster relief map is not subject to the usage limits even if it has been developed/hosted by a commercial entity.",
            errors: [
                {
                    message: `Don't use slashes to separate alternatives.
https://developers.google.com/style/slashes#slashes-with-alternatives
`
                }
            ]
        },
        {
            text: "Call this method 5/6 times.",
            errors: [
                {
                    message: `Don't use slashes with fractions, as they can be ambiguous.
https://developers.google.com/style/slashes#slashes-with-fractions
`
                }
            ]
        },
        // Slashes with fractions
        {
            text: "3/4",
            errors: [
                {
                    message: `Don't use slashes with fractions, as they can be ambiguous.
https://developers.google.com/style/slashes#slashes-with-fractions
`
                }
            ]
        },
        // Slashes with abbreviations
        {
            text: "Mr. Taro Tanaka c/o Mr. Smith ",
            output: "Mr. Taro Tanaka care of Mr. Smith ",
            errors: [
                {
                    message: `Don't use abbreviations that rely on slashes. Instead, spell the words out.
https://developers.google.com/style/slashes#slashes-with-abbreviations
`
                }
            ]
        },
        {
            text: "lint w/ textlint",
            output: "lint with textlint",
            errors: [
                {
                    message: `Don't use abbreviations that rely on slashes. Instead, spell the words out.
https://developers.google.com/style/slashes#slashes-with-abbreviations
`
                }
            ]
        }
    ]
});
