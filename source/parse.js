const VALID_URL = /^(https?:)?\/\/[^\/\s]+(\/|$)/i;

function parseURLParts(url) {
    if (VALID_URL.test(url) !== true) {
        throw new Error(`Invalid URL: ${url}`);
    }
    const match = /^(https?:|)\/\/([^\/\s]+)((\/.*|$))/i.exec(url);
    if (!match) {
        throw new Error(`Invalid URL: Failed parsing URL segments: ${url}`);
    }
    const [, protocolPortion, domainPortion, pathPortion] = match;
    const protocol = protocolPortion.replace(/:$/, "");
    const path = pathPortion || "/";
    let host,
        port = "",
        exactOnly = false;
    if (/^\[[0-9A-F:]+\]/i.test(domainPortion)) {
        // Domain contains an IPv6 address
        const [ipv6Address, portExp] = /^\[([0-9A-F:]+)\](:\d+)?$/i.exec(domainPortion);
        port = portExp ? portExp.substring(1) : port;
        host = ipv6Address;
        exactOnly = true;
    } else if (/^\d{1,3}(\.\d{1,3}){3}/.test(domainPortion)) {
        // Domain contains an IPv6 address
        const [ipAddress, portStr] = domainPortion.split(":");
        host = ipAddress;
        port = portStr || port;
        exactOnly = true;
    } else {
        // Standard domain name
        const [hostStr, portStr] = domainPortion.split(":");
        host = hostStr;
        port = portStr || port;
        exactOnly = host === "localhost";
    }
    if (!host) {
        throw new Error(`Failed extracting host from URL: ${url}`);
    }
    return {
        host,
        port,
        path,
        protocol,
        exactOnly
    };
}

module.exports = {
    parseURLParts
};
