// MIT © 2017 azu
"use strict";
import { paragraphReporter } from "@textlint-rule/textlint-report-helper-for-google-preset";

const URL = "https://developers.google.com/style/units-of-measure";
const report = context => {
    const dictionaries = [
        // Need space
        {
            pattern: / ([\d.]+)(GB|TB|KB)\b/g,
            replace: ({ captures }) => ` ${captures[0]} ${captures[1]}`,
            message: () => `Leave one space between the number and the unit.
${URL}    
`
        },
        // No space
        {
            pattern: / ([£$]) (\d+)\b/g,
            replace: ({ captures }) => ` ${captures[0]}${captures[1]}`,
            message: () => `When the unit of measure is money, degrees, or percent, don't leave a space.
${URL}
`
        },
        {
            pattern: / ([\d.]+) ([%°])([\s.])/g,
            replace: ({ captures }) => ` ${captures[0]}${captures[1]}${captures[2]}`,
            message: () => `When the unit of measure is money, degrees, or percent, don't leave a space.
${URL}
`
        },
        // Don't put a space k
        {
            pattern: / ([\d.]+) k /g,
            replace: ({ captures }) => ` ${captures[0]}k `,
            message: () => `Don't put a space between the number and "k".
${URL}
`
        }
    ];

    const { Syntax, RuleError, getSource, fixer, report } = context;
    return {
        [Syntax.Paragraph](node) {
            return paragraphReporter({
                Syntax,
                node,
                dictionaries,
                report,
                getSource,
                RuleError,
                fixer
            });
        }
    };
};
module.exports = {
    linter: report,
    fixer: report
};
