const { weightScores } = require("../../source/diff.js");

describe("diff", function() {
    describe("weightScores", function() {
        it("correctly calculates final score based off several differently-weighted scores", function() {
            const final = weightScores([
                { score: 0.5, weight: 0.9 },
                { score: 0.2, weight: 0.5 },
                { score: 1.0, weight: 0.75 }
            ]);
            expect(final).to.be.within(0.6, 0.61);
        });

        it("correctly calculates final score using only 1 item", function() {
            const final = weightScores([
                { score: 0.5, weight: 0.1 }
            ]);
            expect(final).to.equal(0.5);
        });
    });
});
