// MIT © 2017 azu
"use strict";
const TextLintTester = require("textlint-tester");
const rule = require("../src/textlint-rule-google-commas");
const tester = new TextLintTester();
tester.run("textlint-rule-google-commas", rule, {
    valid: [
        // Serial commas
        "I dedicate this book to my parents, Ayn Rand, and God.",
        // Commas after introductory words and phrases
        "Finally, only groups that contain parameters appear in this list.",
        "Based on the requirements of your game, you can implement this method to update game information.",
        // Commas separating two independent clauses
        "The libraries not only make feed creation easier, but they also ensure that only valid feeds are produced.",
        "Type your ID and click **OK**.",
        // Commas separating independent from dependent clauses
        "Direct-access flags are plain variables and can be read directly.",
        "The manager acknowledged the last team member who entered the room, and started the meeting.",
        // Setting off other kinds of clauses
        "Name of the group, which has a maximum length of 200 characters.",
        "The variable must have a value; otherwise, the server returns an error."
    ],
    invalid: [
        // Serial commas
        {
            text: "I dedicate this book to my parents, Ayn Rand and God.",
            output: "I dedicate this book to my parents, Ayn Rand, and God.",
            errors: [{}]
        },
        // Commas after introductory words and phrases
        // Commas separating two independent clauses
        /*
        {
            text:
                "The libraries not only make feed creation easier but they also ensure that only valid feeds are produced.",
            output:
                "The libraries not only make feed creation easier, but they also ensure that only valid feeds are produced.",
            errors: [{}]
        },
        {
            text: "Type your ID, and click OK.",
            output: "Type your ID and click **OK**.",
            errors: [{}]
        },
        */
        // Commas separating independent from dependent clauses
        /*
        {
            text: "Direct-access flags are plain variables, and can be read directly.",
            output: "Direct-access flags are plain variables and can be read directly.",
            errors: [{}]
        },
        {
            text: "The manager acknowledged the last team member who entered the room and started the meeting.",
            output: "The manager acknowledged the last team member who entered the room, and started the meeting.",
            errors: [{}]
        },
        */
        // Setting off other kinds of clauses
        /*
        {
            text: "Name of the group which has a maximum length of 200 characters.",
            output: "Name of the group, which has a maximum length of 200 characters.",
            errors: [{}]
        },
        */
        {
            text: "The variable must have a value; otherwise the server returns an error.",
            output: "The variable must have a value; otherwise, the server returns an error.",
            errors: [{}]
        }
    ]
});
