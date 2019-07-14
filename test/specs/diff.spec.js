const { calcuateURLScore, stringContainsSuffix, weightScores } = require("../../source/diff.js");

describe("diff", function() {
    describe("calcuateURLScore", function() {
        it("returns higher score for URLs differing only in path", function() {
            const score = calcuateURLScore(
                "https://my.website.com/some/deep/path.html",
                "https://my.website.com/"
            );
            expect(score).to.be.within(0.7, 0.8);
        });

        it("returns higher score for URLs differing only in port", function() {
            const score = calcuateURLScore(
                "https://my.website.com/some/deep/path.html",
                "https://my.website.com:8080/some/deep/path.html"
            );
            expect(score).to.be.within(0.8, 0.9);
        });

        it("returns exactly 1 if matching", function() {
            const score = calcuateURLScore(
                "https://my.website.com/some/deep/path.html",
                "https://my.website.com/some/deep/path.html"
            );
            expect(score).to.equal(1);
        });

        it("returns medium-level score for URLs with different sub-domains", function() {
            const score = calcuateURLScore(
                "https://my.website.com/",
                "https://website.com/some/page.html"
            );
            expect(score).to.be.within(0.5, 0.7);
        });

        it("returns lower scores for different domains", function() {
            const score = calcuateURLScore(
                "https://my.website.com/some/deep/path.html",
                "https://some.example.dev/some/deep/path.html"
            );
            expect(score).to.be.within(0.2, 0.5);
        });

        it("returns low score for fundamentally different URLs", function() {
            const score = calcuateURLScore(
                "https://my.website.com/some/deep/path.html",
                "http://some.example.dev/test.php?abc=123"
            );
            expect(score).to.be.within(0.0, 0.2);
        });
    });

    describe("stringContainsSuffix", function() {
        it("returns true when suffix is matched", function() {
            expect(stringContainsSuffix("abcde", "cde")).to.be.true;
        });

        it("returns false when suffix is not matched", function() {
            expect(stringContainsSuffix("abcde", "bcd")).to.be.false;
        });
    });

    describe("weightScores", function() {
        it("correctly calculates final score based off several differently-weighted scores", function() {
            const final = weightScores([
                { score: 0.5, weight: 0.9 },
                { score: 0.2, weight: 0.5 },
                { score: 1.0, weight: 0.75 }
            ]);
            expect(final).to.be.within(0.6, 0.61);
        });

        it("correctly calculates correct score using only 1 item", function() {
            const final = weightScores([
                { score: 0.5, weight: 0.1 }
            ]);
            expect(final).to.equal(0.5);
        });

        it("correctly calculates correct score using equal-weight items", function() {
            const final = weightScores([
                { score: 0.25, weight: 0.1 },
                { score: 0.75, weight: 0.1 }
            ]);
            expect(final).to.equal(0.5);
        });
    });
});
