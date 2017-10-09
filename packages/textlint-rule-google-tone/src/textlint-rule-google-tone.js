// MIT © 2017 azu
"use strict";
import { matchTestReplace } from "match-test-replace";
import { EnglishParser } from "nlcst-parse-english";

const toString = require("nlcst-to-string");

const findUnistNode = require("unist-util-find");
const parser = new EnglishParser();
const getTag = (text, word) => {
    const CST = parser.parse(text);
    const node = findUnistNode(CST, node => {
        if (node.type === "WordNode") {
            return toString(node) === word;
        }
        return false;
    });
    if (!node) {
        return "";
    } else if (node.data && node.data.pos) {
        return node.data.pos;
    }
    return "";
};
const report = context => {
    // Politeness and use of "please"
    // https://developers.google.com/style/tone#politeness-and-use-of-please
    const noPleaseVerb = [
        {
            pattern: /To (\w+) (.*), please (\w+)/,
            replaceTest: ({ all, captures }) => {
                return /^VB/.test(getTag(all, captures[0])) && /^VB|NN/.test(getTag(all, captures[2]));
            },
            replace: ({ captures }) => {
                return `To ${captures[0]} ${captures[1]}, ${captures[2]}`;
            },
            message: () => `using "please" in a set of instructions is overdoing the politeness.\n
        URL: https://developers.google.com/style/tone#politeness-and-use-of-please`
        },
        {
            pattern: /(For more \w+), please (\w+)/,
            replaceTest: ({ all, captures }) => {
                return /^VB/.test(getTag(all, captures[1]));
            },
            replace: ({ captures }) => {
                return `${captures[0]}, ${captures[1]}`;
            },
            message: () => `using "please" in a set of instructions is overdoing the politeness.\n
        URL: https://developers.google.com/style/tone#politeness-and-use-of-please`
        }
    ];

    const { Syntax, RuleError, fixer, report, getSource } = context;
    return {
        [Syntax.Str](node) {
            const text = getSource(node);
            noPleaseVerb.forEach(dict => {
                const matchTestReplaceReturn = matchTestReplace(text, dict);
                matchTestReplaceReturn.results.forEach(result => {
                    const index = result.index;
                    const range = [index, index + result.match.length];
                    report(node, new RuleError(result.message, {
                        index,
                        fix: fixer.replaceTextRange(range, result.replace)
                    }));
                });

            });
        }
    };
};
module.exports = {
    linter: report,
    fixer: report
};
