module.exports = {
    rules: {
        abbreviations: require("@textlint-rule/textlint-rule-google-abbreviations"),
        articles: require("@textlint-rule/textlint-rule-google-articles"),
        capitalization: require("@textlint-rule/textlint-rule-google-capitalization"),
        "clause-order": require("@textlint-rule/textlint-rule-google-clause-order"),
        contractions: require("@textlint-rule/textlint-rule-google-contractions"),
        dashes: require("@textlint-rule/textlint-rule-google-dashes"),
        ellipses: require("@textlint-rule/textlint-rule-google-ellipses"),
        "exclamation-points": require("@textlint-rule/textlint-rule-google-exclamation-points"),
        hyphens: require("@textlint-rule/textlint-rule-google-hyphens"),
        possessives: require("@textlint-rule/textlint-rule-google-possessives"),
        "quotation-marks": require("@textlint-rule/textlint-rule-google-quotation-marks"),
        "sentence-spacing": require("@textlint-rule/textlint-rule-google-sentence-spacing"),
        slashes: require("@textlint-rule/textlint-rule-google-slashes"),
        tone: require("@textlint-rule/textlint-rule-google-tone"),
        "word-list": require("@textlint-rule/textlint-rule-google-word-list")
    },
    rulesConfig: {
        abbreviations: true,
        articles: true,
        capitalization: true,
        "clause-order": true,
        contractions: true,
        dashes: true,
        ellipses: true,
        "exclamation-points": true,
        hyphens: true,
        possessives: true,
        "quotation-marks": true,
        "sentence-spacing": true,
        slashes: true,
        tone: true,
        "word-list": true
    }
};
