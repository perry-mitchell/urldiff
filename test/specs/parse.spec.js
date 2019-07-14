const { parseURLParts } = require("../../source/parse.js");

describe("parse", function() {
    describe("parseURLParts", function() {
        it("returns the protocol", function() {
            const result = parseURLParts("http://my.website.org:81/test/system.html");
            expect(result).to.have.property("protocol", "http");
        });

        it("returns the host", function() {
            const result = parseURLParts("http://my.website.org:81/test/system.html");
            expect(result).to.have.property("host", "my.website.org");
        });

        it("returns the port", function() {
            const result = parseURLParts("http://my.website.org:81/test/system.html");
            expect(result).to.have.property("port", "81");
        });

        it("returns the path", function() {
            const result = parseURLParts("http://my.website.org:81/test/system.html");
            expect(result).to.have.property("path", "/test/system.html");
        });

        it("specifies 'exactOnly' as false if using a domain", function() {
            const result = parseURLParts("http://my.website.org/test/system.html");
            expect(result).to.have.property("exactOnly", false);
        });

        it("specifies 'exactOnly' as true if using an IPv4 address", function() {
            const result = parseURLParts("http://192.168.0.2/test/system.html");
            expect(result).to.have.property("exactOnly", true);
        });

        it("specifies 'exactOnly' as true if using an IPv6 address", function() {
            const result = parseURLParts("http://[2001:0db8:85a3:0000:0000:8a2e:0370:7334]/test/system.html");
            expect(result).to.have.property("exactOnly", true);
        });

        it("sets the port to an empty string if not specified", function() {
            const result = parseURLParts("http://192.168.0.2/test/system.html");
            expect(result.port).to.equal("");
        });

        it("specifies 'exactOnly' as true if the URL's host is localhost", function() {
            const result = parseURLParts("http://localhost/test/system.html");
            expect(result).to.have.property("exactOnly", true);
        });

        it("throws for empty URLs", function() {
            expect(() => {
                parseURLParts("");
            }).to.throw(/Invalid URL/i);
        });

        it("throws for invalid URLs", function() {
            expect(() => {
                parseURLParts("file:///test");
            }).to.throw(/Invalid URL/i);
        });
    });
});
