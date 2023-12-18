const Links = require('../db/models/Links');


async function redirection(req, res){

    const linkKey = req.params;

    const link = await Links.findOne({
        where: {link_key: linkKey.linkkey}
    })

    if(link){
        console.log("started link")
        link.total_clicks += 1;
        link.last_click_date = new Date();

        await link.save();
        console.log("saved link")

        return res.redirect(link.destinationURL);
    } else {
        return res.status(404).send('Link not found');
    }


}


module.exports = {redirection}