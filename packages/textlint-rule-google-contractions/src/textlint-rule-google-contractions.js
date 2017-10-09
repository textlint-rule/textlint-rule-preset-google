// MIT © 2017 azu
"use strict";
import { paragraphReporter, getPos, getPosFromSingleWord } from "textlint-report-helper-for-google-preset";

// https://developers.google.com/style/clause-order
export const defaultMessage = "Noun+verb contractions: In general, avoid contractions formed from nouns and verbs.\n"
    + "URL: https://developers.google.com/style/contractions";
const report = context => {
    const dictionaries = [
        {
            pattern: /(\w+)'s (\w+)/,
            replaceTest: ({ all, captures }) => {
                // name
                return /^NN/.test(getPosFromSingleWord(captures[0]))
                    // Adverb
                    && /^RB/.test(getPos(all, captures[1]))
            },
            replace: ({ captures }) => {
                return `${captures[0]} is ${captures[1]}`
            },
            message: () => defaultMessage
        },
        {
            // These machines’re slow.
            pattern: /(\w+)'re (\w+)/,
            replaceTest: ({ all, captures }) => {
                // name
                return /^NN/.test(getPosFromSingleWord(captures[0]))
                    // Adverb or Adjective
                    && /^RB|JJ/.test(getPos(all, captures[1]))
            },
            replace: ({ captures }) => {
                return `${captures[0]} are ${captures[1]}`
            },
            message: () => defaultMessage
        },
        {
            // The following guides're (a) good way to learn to use Universal Analytics.
            pattern: /(\w+)'re (\w+) (\w+)/,
            replaceTest: ({ all, captures }) => {
                // name
                return /^NN/.test(getPosFromSingleWord(captures[0]))
                    // Determiner
                    && /DT/.test(getPos(all, captures[1]))
                    // Adverb or Adjective
                    && /^RB|JJ/.test(getPos(all, captures[2]))
            },
            replace: ({ captures }) => {
                return `${captures[0]} are ${captures[1]} ${captures[2]}`
            },
            message: () => defaultMessage
        }
    ];

    const { Syntax, RuleError, fixer, report } = context;
    return {
        [Syntax.Paragraph](node) {
            paragraphReporter({
                node, dictionaries, report, RuleError, fixer
            });
        }
    };
};
module.exports = {
    linter: report,
    fixer: report
};
