// MIT © 2017 azu
"use strict";
const noExclamationQuestionMark = require("textlint-rule-no-exclamation-question-mark");
const report = context => {
    const {Syntax, RuleError, fixer, report} = context;
    const Types = noExclamationQuestionMark(context);
    return {
        [Syntax.Str](node){
            const result = Types[Syntax.Str](node);
            console.log(result);
            return result;
        }
    }
};
module.exports = {
    linter: report,
    fixer: report
};
