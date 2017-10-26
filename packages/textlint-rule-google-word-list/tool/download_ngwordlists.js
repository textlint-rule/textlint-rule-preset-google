// MIT © 2017 azu
"use strict";
/**
 * Download dont use word list
 * https://developers.google.com/style/word-list
 */
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const client = require("cheerio-httpcli");
const toText = html => {
    const $ = cheerio.load(html);
    return $.text();
};
(async function main() {
    const document = await client.fetch("https://developers.google.com/style/word-list");
    const $ = document.$;
    const dontUseWordList = $(".dontuse");
    const wordList = dontUseWordList
        .map((index, element) => {
            const nextDD = $(element).next();
            if (nextDD.is("dd")) {
                const descriptionHtml = nextDD.html();
                // some work tag is broken
                // Google forget to close <dd>
                // search next <dt> or <dd>, trim
                const match = descriptionHtml.match(/(!?<dt |<dd>)/);
                // clean html tag
                if (!match) {
                    return {
                        word: $(element)
                            .text()
                            .trim(),
                        message: toText(descriptionHtml).trim()
                    };
                }
                const description = descriptionHtml.slice(0, match.index);
                return {
                    word: $(element)
                        .text()
                        .trim(),
                    message: toText(description).trim()
                };
            }
            return {
                word: $(element)
                    .text()
                    .trim(),
                message: ""
            };
        })
        .get();
    fs.writeFileSync(path.join(__dirname, "dont-use-word-list.json"), JSON.stringify(wordList, null, 4), "utf-8");
})();
