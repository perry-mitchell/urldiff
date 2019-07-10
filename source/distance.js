const levenshtein = require("fast-levenshtein");

function calculateSimilarityScore(primary, secondary) {
    return 1 - (stringDistance(primary, secondary) / Math.max(primary.length, secondary.length));
}

function stringDistance(primary, secondary) {
    return levenshtein.get(primary, secondary);
}

module.exports = {
    calculateSimilarityScore
};
