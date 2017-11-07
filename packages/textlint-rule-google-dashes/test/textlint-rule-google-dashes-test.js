const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
const rule = require("../src/textlint-rule-google-dashes");
tester.run("textlint-rule-google-dashes", rule, {
    valid: [
        "To indicate a break in the flow of a sentence—or an interruption—use an em dash, also known as a long dash. Don't put a space before or after it.",
        "example: This is an example.",
        "Appendix A: My First Appendix",
        "Number of range like 2012-2016 is ok.",
        "two-day total",
        "8-20 files",
        "64-bit",
        // allow to write in link
        '`- [uml - What\'s is the difference between include and extend in use case diagram? - Stack Overflow](https://stackoverflow.com/questions/1696927/whats-is-the-difference-between-include-and-extend-in-use-case-diagram "uml - What&#39;s is the difference between include and extend in use case diagram? - Stack Overflow")'
    ],
    invalid: [
        // hyphen to dash
        {
            text:
                "To indicate a break in the flow of a sentence - or an interruption—use an em dash, also known as a long dash. Don't put a space before or after it.",
            output:
                "To indicate a break in the flow of a sentence—or an interruption—use an em dash, also known as a long dash. Don't put a space before or after it.",
            errors: [{}]
        },
        {
            text: "The food - which was delicious - reminded me of home.",
            output: "The food—which was delicious—reminded me of home.",
            errors: [{}, {}]
        },
        // — dash
        {
            text: "example — This is an example.",
            output: "example: This is an example.",
            errors: [{}]
        },
        // - hyphen
        {
            text: "example - This is an example.",
            output: "example: This is an example.",
            errors: [
                // prefer use colons:
                {
                    message: "Use colons(:) instead of dashes(-) in lists\nhttps://developers.google.com/style/dashes"
                },
                {
                    message: 'Use "—"(em dash) instead of " - "(hyphen)\nhttps://developers.google.com/style/dashes'
                }
            ]
        }
        // Not yet support
        // {
        //     text: "Appendix A - My First Appendix.",
        //     output: "Appendix A: My First Appendix.",
        //     errors: [
        //         {}
        //     ]
        // }
    ]
});
