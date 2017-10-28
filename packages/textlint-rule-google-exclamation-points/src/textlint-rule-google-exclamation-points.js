// MIT © 2017 azu
"use strict";
const noExclamationQuestionMark = require("textlint-rule-no-exclamation-question-mark");
const defaultOptions = {
    // allow to use !
    allowHalfWidthExclamation: false,
    // allow to use ！
    allowFullWidthExclamation: false,
    // allow to use ?
    allowHalfWidthQuestion: false,
    // allow to use ？
    allowFullWidthQuestion: false
};
const linter = (context, options = defaultOptions) => {
    const { report } = context;
    return noExclamationQuestionMark(
        Object.assign(context, {
            report: (node, error) => {
                error.message += "\nhttps://developers.google.com/style/exclamation-points";
                report(node, error);
            }
        }),
        options
    );
};
module.exports = linter;
