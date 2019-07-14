const { calcuateURLScore } = require("./diff.js");

const VALUE_GETTER = arrayItem => arrayItem;

/**
 * Sort an array of URLs or items containing URLs by how they
 * score against a reference URL
 * @param {String} referenceURL A URL to use as a reference
 * @param {Object[]|String[]} arr An array of URLs or items containing URLs
 * @param {Number=} minScore The minimum comparison score, filtering out
 *  URL items that fall below it (default = 0)
 * @param {Function=} valueGetter A getter function that can help return
 *  the value from an object or complex instance (defaults to returning the
 *  array element)
 * @returns {Array} Sorted and filtered results array
 * @memberof module:URLDiff
 */
function sortByURL(referenceURL, arr, minScore = 0, valueGetter = VALUE_GETTER) {
    const urlScores = {};
    return arr
        .filter(item => {
            const url = valueGetter(item) || "";
            const score = urlScores[url] || calcuateURLScore(referenceURL, url);
            urlScores[url] = score;
            return score >= minScore;
        })
        .sort((a, b) => {
            const aScore = urlScores[valueGetter(a)];
            const bScore = urlScores[valueGetter(b)];
            if (aScore > bScore) {
                return -1;
            } else if (bScore > aScore) {
                return 1;
            }
            return 0;
        });
}

module.exports = {
    sortByURL
};
