


async function testHeaders(req, res, next){
    try {
        res.status(200).json({ headers: req.headers });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = testHeaders;