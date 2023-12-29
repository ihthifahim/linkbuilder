


async function testHeaders(req, res, next){
    try {
        const referrer = req.headers.referer || req.headers.referrer || '';
        
        res.status(200).json({ headers: req.headers, referrer: referrer});
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = testHeaders;