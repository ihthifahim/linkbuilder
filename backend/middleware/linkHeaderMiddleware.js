
const Links = require('../db/models/Links');
const linkTraffic = require('../db/models/LinkTraffic');
const useragent = require('express-useragent');
const geoip = require('geoip-lite');

function getLinkHeaders(req, res, next){

    if (req.url === '/favicon.ico') {
        return next();
    }

    const linkKey = req.params;


    const userAgent = useragent.parse(req.headers['user-agent']);

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const geo = geoip.lookup(ip);

    const referrer = req.headers.referer || req.headers.referrer || '';

    req.linkDetails = {
        city: geo ? geo.city : 'Unknown',
        region: geo ? geo.region : 'Unknown',
        country: geo ? geo.country : 'Unknown',
        device: userAgent.isMobile ? 'Mobile' : userAgent.isTablet ? 'Tablet' : 'Desktop',
        browser: userAgent.browser,
        os: userAgent.os,
        referrer: referrer,
    };

    try{
        linkTraffic.create({
            linkKey: linkKey.linkkey,
            location_country: req.linkDetails.country,
            location_city: req.linkDetails.city,
            device_device: req.linkDetails.device,
            device_browser: req.linkDetails.browser,
            device_os: req.linkDetails.os,
            referrer: req.linkDetails.referrer,
            ip: ip
        })

    } catch (error) {

    }

    next();
}

module.exports = getLinkHeaders;