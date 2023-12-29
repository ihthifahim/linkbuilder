

function extractDomainFromReferer(referer) {
    if (!referer) {
        return '';
    }

    try {
        const url = new URL(referer);
        return url.hostname;
    } catch (error) {
        console.error('Error extracting domain from referer:', error);
        return null; 
    }
}

module.exports = extractDomainFromReferer