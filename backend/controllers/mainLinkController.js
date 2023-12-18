const Links = require('../db/models/Links');


async function redirection(req, res){

    const linkKey = req.params;

    const link = await Links.findOne({
        where: {link_key: linkKey.linkkey}
    })

    if(link){
        const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'utm_term', 'utm_content'];
        let appendedURL = link.destinationURL;

        utmParams.forEach(param => {
            if (link[param]) {
                appendedURL += (appendedURL.includes('?') ? '&' : '?') + `${param}=${encodeURIComponent(link[param])}`;
            }
        });

        link.total_clicks += 1;
        link.last_click_date = new Date();

        await link.save();
        
        return res.redirect(appendedURL);
        // return res.redirect(link.destinationURL);
    } else {
        return res.status(404).send('Link not found');
    }


}


module.exports = {redirection}