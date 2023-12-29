const Links = require('../db/models/Links');

function generateLinkKey(){
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomId += characters.charAt(randomIndex);
    }

    return randomId;
}


function findFavicon($, url) {
    const possibleFaviconPaths = [
        '/favicon.ico', // Default favicon path
        '/apple-touch-icon.png', // iOS favicon path
        '/favicon.png', // Another common path
    ];

    for (const path of possibleFaviconPaths) {
        const absolutePath = new URL(path, url).href;
        if ($(`link[href="${absolutePath}"]`).length > 0) {
            return absolutePath;
        }
    }

    // If none of the common paths are found, try to extract it from the HTML
    const faviconElement = $('link[rel="icon"], link[rel="icon shortcut"] ,link[rel="shortcut icon"]').first();
    const faviconUrl = faviconElement.attr('href');
    if (faviconUrl) {
        return new URL(faviconUrl, url).href;
    }

    return null; // Favicon not found
}




module.exports = {generateLinkKey, findFavicon}