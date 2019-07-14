const { calcuateURLScore } = require("./diff.js");

const VALUE_GETTER = arrayItem => arrayItem;

function sortByURL(referenceURL, arr, minScore = 0, valueGetter = VALUE_GETTER) {
    const urlScores = {};
    return arr
        .filter(item => {
            const url = valueGetter(item) || "";
            const score = urlScores[url] || calcuateURLScore(referenceURL, url);
            urlScores[url] = score;
            return score > minScore;
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
