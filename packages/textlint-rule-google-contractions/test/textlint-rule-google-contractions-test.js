const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
const rule = require("../src/textlint-rule-google-contractions");
const defaultMessage = require("../src/textlint-rule-google-contractions").defaultMessage;
tester.run("textlint-rule-google-contractions", rule, {
    valid: [
        "Say you want to tell the audience to do something in a particular circumstance. If possible, mention the circumstance before you provide the instruction; that way, the reader can skip the instruction if the circumstance doesn't apply.",
        "To get the user's phone number, call `user.phoneNumber.get()`.",
        "To clean up, call the `collectGarbage()` method.",
        "For more information, see [link to other document].",
        "To delete the entire document, click Delete.",
    ],
    invalid: [
        {
            text: "The browser's fast, simple, and secure.",
            output: "The browser is fast, simple, and secure.",
            errors: [
                {
                    message: defaultMessage,
                    index: 0
                }
            ],
        },
        {
            text: "These machines're slow.",
            output: "These machines are slow.",
            errors: [
                {
                    message: defaultMessage,
                    index: 0
                }
            ],
        },
        {
            text: "The following guides're a good way to learn to use Universal Analytics.",
            output: "The following guides are a good way to learn to use Universal Analytics.",
            errors: [
                {
                    message: defaultMessage,
                    index: 0
                }
            ],
        }
    ]
});
