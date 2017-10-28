const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
const rule = require("../src/textlint-rule-google-clause-order");
const defaultMessage = require("../src/textlint-rule-google-clause-order").defaultMessage;
tester.run("textlint-rule-google-clause-order", rule, {
    valid: [
        "Say you want to tell the audience to do something in a particular circumstance. If possible, mention the circumstance before you provide the instruction; that way, the reader can skip the instruction if the circumstance doesn't apply.",
        "To get the user's phone number, call `user.phoneNumber.get()`.",
        "To clean up, call the `collectGarbage()` method.",
        "For more information, see [link to other document].",
        "To delete the entire document, click Delete."
    ],
    invalid: [
        {
            text: "See link for more information.",
            output: "For more information, see link.",
            errors: [
                {
                    message: defaultMessage,
                    index: 0
                }
            ]
        },
        {
            text: "See link for more detail.",
            output: "For more detail, see link.",
            errors: [
                {
                    message: defaultMessage,
                    index: 0
                }
            ]
        },
        // TODO: Can't support yet
        // includes Link node patter
        // {
        //     text: "See [link](http://example.com) for more detail.",
        //     output: "For more detail, see [link](http://example.com).",
        //     errors: [
        //         {
        //             message: defaultMessage,
        //             index: 0
        //         }
        //     ]
        // },
        {
            text: "Click Delete if you want to delete the entire document.",
            output: "To delete the entire document, click Delete.",
            errors: [
                {
                    message: defaultMessage,
                    index: 0
                }
            ]
        }
    ]
});
