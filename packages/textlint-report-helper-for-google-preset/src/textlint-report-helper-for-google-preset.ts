// MIT © 2017 azu
import { matchTestReplace, TestMatchReplaceReturnDict } from "match-test-replace";
import { EnglishParser } from "nlcst-parse-english";
import { Tag } from "en-pos";
import { ASTNodeTypes } from "@textlint/ast-node-types";

const { RuleHelper, IgnoreNodeManager } = require("textlint-rule-helper");
const toString = require("nlcst-to-string");
const StringSource = require("textlint-util-to-string");
const findUnistNode = require("unist-util-find");
const parser = new EnglishParser();

// Additional lexicon
const lexicon = require("en-lexicon");
lexicon.extend({
    browser: "NN"
});

/**
 * Pos Type
 * @see https://github.com/finnlp/en-pos
 */
export const PosType = {
    Noun: "NN",
    PluralNoun: "NNS",
    ProperNoun: "NNP",
    PluralProperNoun: "NNPS",
    BaseFormVerb: "VB",
    PresentFormVerb: "VBP",
    PresentForm3RdPerson: "VBZ",
    GerundFormVerb: "VBG",
    PastTenseVerb: "VBD",
    PastParticipleVerb: "VBN",
    ModalVerb: "MD",
    Adjective: "JJ",
    ComparativeAdjective: "JJR",
    SuperlativeAdjective: "JJS",
    Adverb: "RB",
    ComparativeAdverb: "RBR",
    SuperlativeAdverb: "RBS",
    Determiner: "DT",
    Predeterminer: "PDT",
    PersonalPronoun: "PRP",
    PossessivePronoun: "PRP$",
    PossessiveEnding: "POS",
    Preposition: "IN",
    Particle: "PR",
    To: "TO",
    WhDeterminer: "WDT",
    WhPronoun: "WP",
    WhPossessive: "WP$",
    WhAdverb: "WRB",
    ExpletiveThere: "EX",
    CoordinatingConjugation: "CC",
    CardinalNumbers: "CD",
    ListItemMarker: "LS",
    Interjection: "UH",
    ForeignWords: "FW",
    Comma: ",",
    MidSentPunct: ":",
    SentFinalPunct: ".",
    LeftParenthesis: "(",
    RightParenthesis: ")",
    PoundSign: "#",
    CurrencySymbols: "$",
    OtherSymbols: "SYM",
    EmojisEmoticons: "EM"
};

export const getPosFromSingleWord = (word: string): string => {
    const tags = new Tag([word])
        .initial() // initial dictionary and pattern based tagging
        .smooth().tags; // further context based smoothing
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

// str
export const shouldIgnoreNodeOfStrNode = (node: any, context: any) => {
    const helper = new RuleHelper(context);
    const Syntax = context.Syntax;
    return helper.isChildNode(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote, Syntax.Emphasis]);
};

export interface StrReporterArgs {
    node: any;
    dictionaries: TestMatchReplaceReturnDict[];
    report: (node: any, message: any) => void;
    RuleError: any;
    fixer: any;
    getSource: (node: any, beforeCount?: number, afterCount?: number) => string;
}

export const strReporter = ({ node, dictionaries, report, RuleError, fixer, getSource }: StrReporterArgs) => {
    const text = getSource(node);
    dictionaries.forEach(dict => {
        const matchTestReplaceReturn = matchTestReplace(text, dict);
        if (matchTestReplaceReturn.ok === false) {
            return;
        }
        matchTestReplaceReturn.results.forEach(result => {
            const index = result.index;
            if (!result.replace) {
                report(
                    node,
                    new RuleError(result.message, {
                        index
                    })
                );
                return;
            }
            const endIndex = result.index + result.match.length;
            const range = [index, endIndex];
            report(
                node,
                new RuleError(result.message, {
                    index,
                    fix: fixer.replaceTextRange(range, result.replace)
                })
            );
        });
    });
};

export interface ParagraphReporterArgs {
    Syntax: typeof ASTNodeTypes;
    node: any;
    dictionaries: TestMatchReplaceReturnDict[];
    report: (node: any, message: any) => void;
    RuleError: any;
    fixer: any;
    getSource: (node: any, beforeCount?: number, afterCount?: number) => string;
}

export const paragraphReporter = ({
    Syntax,
    node,
    dictionaries,
    getSource,
    report,
    RuleError,
    fixer
}: ParagraphReporterArgs) => {
    const originalText = getSource(node);
    const source = new StringSource(node);
    const text = source.toString();
    const ignoreNodeManager = new IgnoreNodeManager();
    // Ignore following pattern
    // Paragraph > Link Code Html ...
    ignoreNodeManager.ignoreChildrenByTypes(node, [Syntax.Code, Syntax.Link, Syntax.BlockQuote, Syntax.Html]);
    dictionaries.forEach(dict => {
        const matchTestReplaceReturn = matchTestReplace(text, dict);
        if (matchTestReplaceReturn.ok === false) {
            return;
        }
        matchTestReplaceReturn.results.forEach(result => {
            const index = source.originalIndexFromIndex(result.index);
            const endIndex = source.originalIndexFromIndex(result.index + result.match.length);
            const range = [index, endIndex];
            // if the error is ignored, don't report
            if (ignoreNodeManager.isIgnoredRange(range)) {
                return;
            }
            if (!result.replace) {
                report(
                    node,
                    new RuleError(result.message, {
                        index
                    })
                );
                return;
            }
            const beforeText = originalText.slice(index, endIndex);
            if (beforeText !== result.match) {
                report(
                    node,
                    new RuleError(result.message, {
                        index
                    })
                );
                return;
            }
            report(
                node,
                new RuleError(result.message, {
                    index,
                    fix: fixer.replaceTextRange(range, result.replace)
                })
            );
        });
    });
};
