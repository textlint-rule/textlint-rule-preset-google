// MIT © 2017 azu
import { matchTestReplace, TestMatchReplaceReturnDict } from "match-test-replace";
import { EnglishParser } from "nlcst-parse-english";
import { Tag } from "en-pos";

const toString = require("nlcst-to-string");
const StringSource = require("textlint-util-to-string");
const findUnistNode = require("unist-util-find");
const parser = new EnglishParser();

// Additional lexicon
const lexicon = require("en-lexicon");
lexicon.extend({
    browser: "NN",
});
export const getPosFromSingleWord = (word: string): string => {
    const tags = new Tag([word])
        .initial() // initial dictionary and pattern based tagging
        .smooth() // further context based smoothing
        .tags;
    return tags[0];
};

export const getPos = (text: string, word: string): string => {
    const CST = parser.parse(text);
    const node = findUnistNode(CST, (node: any) => {
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

export interface StrReporterArgs {
    node: any,
    dictionaries: TestMatchReplaceReturnDict[],
    report: (node: any, message: any) => void,
    RuleError: any,
    fixer: any,
    getSource: any
}

export const strReporter = ({
                                node, dictionaries, report, RuleError, fixer, getSource
                            }: StrReporterArgs) => {
    const text = getSource(node);
    dictionaries.forEach(dict => {
        const matchTestReplaceReturn = matchTestReplace(text, dict);
        if (matchTestReplaceReturn.ok === false) {
            return;
        }
        matchTestReplaceReturn.results.forEach(result => {
            const index = result.index;
            const endIndex = result.index + result.match.length;
            const range = [index, endIndex];
            report(node, new RuleError(result.message, {
                index,
                fix: fixer.replaceTextRange(range, result.replace)
            }));
        });

    });
};

export interface ParagraphReporterArgs {
    node: any,
    dictionaries: TestMatchReplaceReturnDict[],
    report: (node: any, message: any) => void,
    RuleError: any,
    fixer: any
}

export const paragraphReporter = ({
                                      node, dictionaries, report, RuleError, fixer
                                  }: ParagraphReporterArgs) => {
    const source = new StringSource(node);
    const text = source.toString();
    dictionaries.forEach(dict => {
        const matchTestReplaceReturn = matchTestReplace(text, dict);
        if (matchTestReplaceReturn.ok === false) {
            return;
        }
        matchTestReplaceReturn.results.forEach(result => {
            const index = source.originalIndexFromIndex(result.index);
            const endIndex = source.originalIndexFromIndex(result.index + result.match.length);
            const range = [index, endIndex];
            report(node, new RuleError(result.message, {
                index,
                fix: fixer.replaceTextRange(range, result.replace)
            }));
        });
    });
};