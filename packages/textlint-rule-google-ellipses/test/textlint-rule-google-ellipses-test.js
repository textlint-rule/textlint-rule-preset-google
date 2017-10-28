// MIT © 2017 azu
"use strict";
const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
const rule = require("../src/textlint-rule-google-ellipses");
tester.run("textlint-rule-google-ellipses", rule, {
    valid: [
        'My high school English teacher made me learn that Shakespeare quote: "All the world\'s a stage, ... And one man in his time plays many parts."',
        "To get the user's phone number, call `user.phoneNumber.get()`.",
        "You don't need to understand all the other Python code in there ... we'll explain it all in class.",
        "You don't need to understand all the other Python code in there ..."
    ],
    invalid: [
        // Suspension points
        {
            text: "The answer is ... wait for it ... that you shouldn't do this.",
            errors: [
                {
                    index: 13
                }
            ]
        },
        // beginning of the text.
        {
            text:
                'My high school English teacher made me learn that Shakespeare quote about all the world being a stage and " ... all the men and women merely players."',
            errors: [
                {
                    index: 106
                }
            ]
        },
        // end of text
        {
            text:
                'My high school English teacher made me learn that Shakespeare quote: "All the world\'s a stage, And all the men and women merely players ...."',
            errors: [
                {
                    index: 137
                }
            ]
        },
        // space
        {
            text: "You don't need to understand all the other Python code in there...we'll explain it all in class.",
            output:
                "You don't need to understand all the other Python code in there ... we'll explain it all in class.",
            errors: [
                {
                    index: 58
                }
            ]
        },
        {
            text: "You don't need to understand all the other `Python` code in there...we'll explain it all in class.",
            output:
                "You don't need to understand all the other `Python` code in there ... we'll explain it all in class.",
            errors: [
                {
                    index: 60
                }
            ]
        }
    ]
});
