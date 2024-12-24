
const Links = require('../db/models/Links');
const linkTraffic = require('../db/models/LinkTraffic');
const ErrorLog = require('../db/models/ErrorLog')
const { Op } = require('sequelize');

const useragent = require('express-useragent');
const geoip = require('geoip-lite');

const extractDomainFromReferer = require('../helpers/extractDomain');

async function getLinkHeaders(req, res, next){
    
    const skipUrls = ['/favicon.ico', '/.git', '/docker-compose.yml', '/.env'];

    if (skipUrls.includes(req.url)) {
        return next();
    }
    
    const linkKey = req.params;
    const userAgent = useragent.parse(req.headers['user-agent']);

    const ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'];
    console.log(ip)
    const geo = geoip.lookup(ip);


    const refererDomain = req.headers.referer || req.headers.referrer || '';
    const referrer = extractDomainFromReferer(refererDomain);

    

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

        const lastHour = new Date(new Date() - 60 * 60 * 1000);
        const existingRecord = await linkTraffic.findOne({
            where: {
                linkKey: linkKey.linkkey,
                ip: ip,
                createdAt: { [Op.gte]: lastHour },
            },
        });

        if (!existingRecord) {
            const skipbots = ['facebookexternalhit', 'unknown', 'Twitterbot'];
            if(skipbots.includes(req.linkDetails.browser)){
                return next();
            } else {
                await linkTraffic.create({
                    linkKey: linkKey.linkkey,
                    location_country: req.linkDetails.country,
                    location_city: req.linkDetails.city,
                    device_device: req.linkDetails.device,
                    device_browser: req.linkDetails.browser,
                    device_os: req.linkDetails.os,
                    referrer: req.linkDetails.referrer,
                    ip: ip
                });
            }
            
        }

    } catch (error) {

         await ErrorLog.create({
            errorMessage: error.message,
        });
    }
    
    next();
}

module.exports = getLinkHeaders;