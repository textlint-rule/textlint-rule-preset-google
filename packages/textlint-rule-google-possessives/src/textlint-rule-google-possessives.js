// MIT © 2017 azu
"use strict";
import { paragraphReporter, getPosFromSingleWord } from "textlint-report-helper-for-google-preset";

const values = require("object.values");

const irregularPlurals = require("irregular-plurals");
const irregularPluralValues = values(irregularPlurals);
export const defaultMessage = `In general, to form a possessive of a singular noun (regardless of whether it ends in s) or a plural noun that doesn't end in s, add 's to the end of the word. For a plural noun that does end in s, add an apostrophe but no additional s.`;
const report = context => {
    const { Syntax, RuleError, fixer, report } = context;
    const dictionaries = [
        // NG: plural word + 's
        {
            pattern: /(\w+)'s/,
            replaceTest: ({ captures }) => {
                const word = captures[0];
                // ignore irregular plural Word
                if (irregularPluralValues.includes(word)) {
                    return false;
                }
                const wordPos = getPosFromSingleWord(word);
                // Plural word
                return wordPos === "NNS";
            },
            message: () => defaultMessage
        },
        // NG: singular noun + '
        {
            pattern: /([\w\s]+)'(?!s)/,
            replaceTest: ({ captures }) => {
                // ... word's
                // or ... the word's
                const words = captures[0].split(" ");
                const determinerWord = words[words.length - 2];
                const targetWord = words[words.length - 1];
                // if "the word's", ignore this
                if (determinerWord !== undefined) {
                    const deteminerType = getPosFromSingleWord(determinerWord);
                    console.log(deteminerType);
                    // skip: the a
                    if (deteminerType === "DT") {
                        return false;
                    }
                }
                const wordPos = getPosFromSingleWord(targetWord);
                // singular noun(singular noun or Proper noun)
                return wordPos === "NNP" || wordPos === "NN";
            },
            message: () => defaultMessage
        }
    ];

    return {
        [Syntax.Paragraph](node) {
            paragraphReporter({
                node,
                dictionaries,
                report,
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
