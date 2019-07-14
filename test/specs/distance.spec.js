const { calculateSimilarityScore } = require("../../source/distance.js");

describe("distance", function() {
    describe("calculateSimilarityScore", function() {
        it("completely different strings to have a score of 0", function() {
            expect(calculateSimilarityScore("", "aaa")).to.equal(0);
        });

        it("similar strings to have an acceptable score range", function() {
            expect(calculateSimilarityScore("/a/b/c", "/a/b")).to.be.within(0.6, 0.7);
        });

        it("matching strings to have a score of 1", function() {
            expect(calculateSimilarityScore("/a/b", "/a/b")).to.equal(1);
        });
    });
});
