// MIT © 2017 azu
"use strict";
const capitalizationRule = require("textlint-rule-en-capitalization");
const DocumentURL = "https://developers.google.com/style/capitalization";
const defaultOptions = {
    // allow lower-case words in anywhere
    allowWords: []
};
const createReporter = capitalizationReport => {
    return (context, options = defaultOptions) => {
        const { report } = context;
        return capitalizationReport(
            Object.assign(context, {
                report: (node, error) => {
                    error.message += "\n" + DocumentURL;
                    report(node, error);
                }
            }),
            options
        );
    };
};
module.exports = {
    linter: createReporter(capitalizationRule.linter),
    fixer: createReporter(capitalizationRule.fixer)
};
