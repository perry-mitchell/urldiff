const { sortByURL } = require("../../source/sort.js");

describe("sort", function() {
    describe("sortByURL", function() {
        const URL_A = "https://some-page.com/test/index.php";
        const URL_B = "http://192.168.0.2:81/imagine.html";
        const URL_C = "https://testing.some-page.com/test-page.htm";

        it("sorts URLs correctly", function() {
            const sorted = sortByURL("http://host.some-page.com", [
                URL_B,
                URL_A,
                URL_C
            ]);
            expect(sorted).to.deep.equal([
                URL_A,
                URL_C,
                URL_B
            ]);
        });
    });
});
