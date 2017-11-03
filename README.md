# textlint-rule-preset-google-developer [![Build Status](https://travis-ci.org/textlint-rule/textlint-rule-preset-google.svg?branch=master)](https://travis-ci.org/textlint-rule/textlint-rule-preset-google)

[Google Developer Documentation Style Guide](https://developers.google.com/style/) for [textlint](https://github.com/textlint/textlint "textlint").

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @textlint-rule/textlint-rule-preset-google-developer

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "@textlint-rule/preset-google-developer": true
    }
}
```

Via CLI

```
textlint --rule preset-google-developer README.md
```

## Rules

> Remember that everything in this guide is a guideline, not a draconian rule.

- Introduction
- [About this guide](https://developers.google.com/style/)
- [Style-guide highlights](https://developers.google.com/style/highlights)
- General principles
- [Style and tone](https://developers.google.com/style/tone)
   - [ ] Some things to avoid where possible
     - [ ] Placeholder phrases like "please note" and "at this time."
     - [ ] Starting all sentences with the same phrase (such as "You can" or "Todo").
     - [ ] Phrasing in terms of "let's" do something.
     - [ ] Using phrases like "simply" or "It's that simple" or "It's easy" in a
     - [ ] procedure, unless it's an extraordinarily simple/easy procedure.
   - [x] [Politeness and use of "please"](https://developers.google.com/style/tone#politeness-and-use-of-please "Politeness and use of &#34;please&#34;")
     - :heavy_check_mark: `textlint-rule-google-tone`
- [Documenting future features](https://developers.google.com/style/future)
- [Accessible content](https://developers.google.com/style/accessibility)
- [Writing for a global audience](https://developers.google.com/style/translation)
    - :heavy_check_mark: `textlint-rule-google-contractions`
    - [x] Avoid misplaced modifiers.
- Language and grammar
- [Abbreviations](https://developers.google.com/style/abbreviations)
    - :heavy_check_mark: `textlint-rule-google-abbreviations`
    - [x] Prefer English terms over Latin abbreviations. Don't use "i.e." or "e.g.";
      - instead, use "that is" or "for example," respectively.
    - [x] Periods with abbreviations
- [Active voice](https://developers.google.com/style/voice)
    - [ ] use active voice instead of passive voice
- [Anthropomorphism](https://developers.google.com/style/anthropomorphism)
- [Articles (a, an, the)](https://developers.google.com/style/articles)
    - :heavy_check_mark: `textlint-rule-google-articles`
    - [x] a/an = indefinite article
    - [ ] the = definite article
- [Capitalization](https://developers.google.com/style/capitalization)
    - :heavy_check_mark: `textlint-rule-google-capitalization`
    - [x] Capitalization in titles and headings
    - [ ] Capitalization and colons
    - [x] Capitalization and figures
    - [x] Capitalization and hyphenated words
    - [x] Capitalization in lists
    - [ ] Capitalization for tables in text
- [Clause order](https://developers.google.com/style/clause-order)
    - :heavy_check_mark: `textlint-rule-google-clause-order`
    - [x] For more details
    - [x] To ~, instruction
- [Contractions](https://developers.google.com/style/contractions)
    - :heavy_check_mark: `textlint-rule-google-contractions`
    - [x] Noun+verb contractions
    - [x] Don't use double contractions
- [Cross-references](https://developers.google.com/style/cross-references)
- [Plurals in parentheses](https://developers.google.com/style/plurals-parentheses)
    - [ ] Don't put optional plurals in parentheses.
- [Prepositions](https://developers.google.com/style/prepositions)
- [Present tense](https://developers.google.com/style/tense)
    - [ ] will
    - [ ] would
- [Pronouns](https://developers.google.com/style/pronouns)
    - [ ] Gender-neutral pronouns
    - [ ] Personal pronouns/Second Person
- [Second person](https://developers.google.com/style/person)
    - Use "you" rather than "we."
- [Spelling](https://developers.google.com/style/spelling)
- [Verb forms in reference documentation](https://developers.google.com/style/reference-verbs)
- [Word list](https://developers.google.com/style/word-list)
    - :heavy_check_mark: `textlint-rule-google-word-list`
    - [x] Word list
- Punctuation
- [Apostrophes (possessives)](https://developers.google.com/style/possessives)
    - :heavy_check_mark: `textlint-rule-google-possessives`
    - [x] incorrect possessives
- [Colons](https://developers.google.com/style/colons)
- [Commas](https://developers.google.com/style/commas)
- [Dashes](https://developers.google.com/style/dashes)
    - :heavy_check_mark: `textlint-rule-google-dashes`
    - [x] use `—` insteadof `-`
    - [x] Colons instead of dashes in lists
- [Ellipses](https://developers.google.com/style/ellipses)
    - :heavy_check_mark: `textlint-rule-google-ellipses`
    - [x] Use quoted text
    - [x] Punctuation and spacing
- [Exclamation points](https://developers.google.com/style/exclamation-points)
    - :heavy_check_mark: `textlint-rule-google-possessives`
    - [x] Don't use `!` and `?`
- [Hyphens](https://developers.google.com/style/hyphens)
    - :heavy_check_mark: `textlint-rule-google-hyphens`
    - [x] Don't hyphenate adverbs ending in "ly" 
    - [x] Don't add words such as -from- or -between-.
- [Parentheses](https://developers.google.com/style/parentheses)
- [Periods](https://developers.google.com/style/periods)
- [Pluralizing a single letter](https://developers.google.com/style/plural-single-letter)
- [Quotation marks](https://developers.google.com/style/quotation-marks)
    - :heavy_check_mark: `textlint-rule-google-quotation-marks`
    - [ ] American Style
    - [x] Single quotation marks
- [Semicolons](https://developers.google.com/style/semicolons)
- [Slashes](https://developers.google.com/style/slashes)
    - :heavy_check_mark: `textlint-rule-google-slashes`
    - [ ] Slashes with dates
    - [ ] Slashes with file paths and URLs
    - [x] Slashes with alternatives
    - [x] Slashes with fractions
    - [x] Slashes with abbreviations
- Formatting and organization
- [Dates and times](https://developers.google.com/style/dates-times)
- [Figures and other images](https://developers.google.com/style/images)
- [Headings and titles](https://developers.google.com/style/headings)
    - [ ] Capitalization
- [Lists](https://developers.google.com/style/lists)
- [Notes and other notices](https://developers.google.com/style/notices)
- [Numbers](https://developers.google.com/style/numbers)
- [Phone numbers](https://developers.google.com/style/phone-numbers)
- [Procedures](https://developers.google.com/style/procedures)
- [Spaces between sentences](https://developers.google.com/style/sentence-spacing)
    - :heavy_check_mark: `textlint-rule-google-sentence-spacing`
    - [x] Leave only one space between sentences
- [Tables](https://developers.google.com/style/tables)
- [Units of measurement](https://developers.google.com/style/units-of-measure)
    - [ ] Formatting units of measurement
- Computer interfaces
- [API reference code comments](https://developers.google.com/style/api-reference-comments)
- [Code in text](https://developers.google.com/style/code-in-text)
- [Code samples](https://developers.google.com/style/code-samples)
- [Documenting command-line syntax](https://developers.google.com/style/code-syntax)
- [Linking to other sites](https://developers.google.com/style/links-external)
- [UI elements and interaction](https://developers.google.com/style/ui-elements)
- HTML and CSS
- [Fonts and font size](https://developers.google.com/style/fonts)
- [HTML and semantic tagging](https://developers.google.com/style/semantic-tagging)
- [HTML formatting](https://developers.google.com/style/html-formatting)
- [Link text](https://developers.google.com/style/link-text)
- [Making headings into link targets](https://developers.google.com/style/headings-targets)
- [Markdown versus HTML](https://developers.google.com/style/markdown)
- [URLs in img elements](https://developers.google.com/style/img-elements)
- [URLs in links](https://developers.google.com/style/url-links)
- Names and naming
- [Example domains and names](https://developers.google.com/style/examples)
- [File names](https://developers.google.com/style/file-names)
- [Product names](https://developers.google.com/style/product-names)
- [Trademarks](https://developers.google.com/style/trademarks)
- Other
- [Other editorial resources](https://developers.google.com/style/resources)
- [Release notes](https://developers.google.com/style/release-notes)

## Changelog

See [Releases page](https://github.com/textlint-rule/textlint-rule-preset-google-developer/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

For bugs and feature requests, [please create an issue](https://github.com/textlint-rule/textlint-rule-preset-google-developer/issues).

Pull requests and stars are always welcome.

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

### Adding new rule

1. Create `pacakges/textlint-rule-<rule-name>`
    - Rule name is based on style guide URL
    - For example, https://developers.google.com/style/clause-order's rule name is `clause-order`
2. Setup package using [textlint-scripts](https://github.com/textlint/textlint-scripts "textlint-scripts").
3. Write rule
4. Test rule
5. Submit Pull Request!

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
