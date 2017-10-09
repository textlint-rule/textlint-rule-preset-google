const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
const rule = require("../src/textlint-rule-google-tone");
// ruleName, rule, { valid, invalid }
const message = `using "please" in a set of instructions is overdoing the politeness.\n
        URL: https://developers.google.com/style/tone#politeness-and-use-of-please`;
tester.run("textlint-rule-google-tone", rule, {
    valid: [
        "To view the document, click View.",
        "To get the user's phone number, call `user.phoneNumber.get()`.",
        "To clean up, call the `collectGarbage()` method."
    ],
    invalid: [
        {
            text: "To view the document, please click View.",
            output: "To view the document, click View.",
            errors: [
                {
                    message: message,
                    index: 0
                }
            ]
        },
        {
            text: "For more information, please see document.",
            output: "For more information, see document.",
            errors: [
                {
                    message: message,
                    index: 0
                }
            ]
        }
    ]
});
