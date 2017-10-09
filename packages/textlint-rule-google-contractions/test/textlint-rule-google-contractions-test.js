const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
const rule = require("../src/textlint-rule-google-contractions");
const nounVerbMessage = require("../src/textlint-rule-google-contractions").nounVerbMessage;
const noDoubleContractions = require("../src/textlint-rule-google-contractions").noDoubleContractions;
tester.run("textlint-rule-google-contractions", rule, {
    valid: [
        "Say you want to tell the audience to do something in a particular circumstance. If possible, mention the circumstance before you provide the instruction; that way, the reader can skip the instruction if the circumstance doesn't apply.",
        "To get the user's phone number, call `user.phoneNumber.get()`.",
        "To clean up, call the `collectGarbage()` method.",
        "For more information, see [link to other document].",
        "To delete the entire document, click Delete.",
        "Double contractions contain not just one but two contracted words. Some examples of double contractions are as follows:",
        "In some cases, it's OK to use a noun+verb contraction, such as \"If you want to display information, a table's your best option.\" But in general, it's best to avoid that kind of contraction.",
        "The second example above is better because using 's in place of is could cause the reader to think that \"browser's\" is the possessive form."
    ],
    invalid: [
        {
            text: "The browser's fast, simple, and secure.",
            output: "The browser is fast, simple, and secure.",
            errors: [
                {
                    message: nounVerbMessage
                }
            ]
        },
        {
            text: "These machines're slow.",
            output: "These machines are slow.",
            errors: [
                {
                    message: nounVerbMessage
                }
            ]
        },
        {
            text: "The following guides're a good way to learn to use Universal Analytics.",
            output: "The following guides are a good way to learn to use Universal Analytics.",
            errors: [
                {
                    message: nounVerbMessage
                }
            ]
        },
        {
            text: "you shouldn't've done.",
            output: "you should not have done.",
            errors: [
                {
                    message: noDoubleContractions
                }
            ]
        }
    ]
});
