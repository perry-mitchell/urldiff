const { parseURLParts } = require("./parse.js");
const { calculateSimilarityScore } = require("./distance.js");

const HOST_WEIGHT = 1;
const PATH_WEIGHT = 0.8;
const PORT_WEIGHT = 0.6;
const PROTOCOL_WEIGHT = 0.2;

function calcuateURLScore(primaryURL, secondaryURL) {
    const primary = typeof primaryURL === "string" ? parseURLParts(primaryURL) : primaryURL;
    const secondary = typeof secondaryURL === "string" ? parseURLParts(secondaryURL) : secondaryURL;
    if ((primary.exactOnly || secondary.exactOnly) && primary.host !== secondary.host) {
        return 0;
    }
    const protoDiff = compareProtocols(primary.protocol, secondary.protocol);
    const hostDiff = compareHosts(primary.host, secondary.host);
    const portDiff = comparePorts(primary.port, secondary.port);
    const pathDiff = comparePaths(primary.path, secondary.path);
    return weightScores([
        { score: protoDiff, weight: PROTOCOL_WEIGHT },
        { score: hostDiff, weight: HOST_WEIGHT },
        { score: portDiff, weight: PORT_WEIGHT },
        { score: pathDiff, weight: PATH_WEIGHT }
    ]);
}

function compareHosts(primary, secondary) {
    if (stringContainsSuffix(primary, secondary) || stringContainsSuffix(secondary, primary)) {
        return calculateSimilarityScore(primary, secondary);
    }
    return 0;
}

function comparePaths(primary, secondary) {
    let prefixMatchedCharacters = 0;
    for (let i = 0; i < primary.length; i += 1) {
        if (i >= secondary.length || primary[i] !== secondary[i]) {
            break;
        }
        prefixMatchedCharacters += 1;
    }
    const prefixScore = prefixMatchedCharacters / Math.max(primary.length, secondary.length);
    return prefixScore * calculateSimilarityScore(primary, secondary);
}

function comparePorts(primary, secondary) {
    return primary === secondary ? 1 : 0;
}

function compareProtocols(primary, secondary) {
    return primary.toLowerCase() === secondary.toLowerCase() ? 1 : 0;
}

function stringContainsSuffix(str, suffix) {
    return str.length >= suffix.length && str.indexOf(suffix) === (str.length - suffix.length);
}

function weightScores(scores) {
    const totalWeight = scores.reduce((total, item) => total + item.weight);
    const totalScore = scores.reduce((total, item) => total + (item.weight * item.score));
    return totalScore / totalWeight;
}

module.exports = {
    calcuateURLScore,
    stringContainsSuffix
};