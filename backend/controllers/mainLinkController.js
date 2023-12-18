const Links = require('../db/models/Links');

async function redirection(req, res){

    const linkKey = req.params;

    const link = await Links.findOne({
        where: {link_key: linkKey.linkkey}
    })

    if(link){
        await Links.update(
            {
              total_clicks: sequelize.literal('total_clicks + 1'),
              last_click_date: new Date()
            },
            {
              where: { link_key: linkKey.linkkey }
            }
          );
        return res.redirect(link.destinationURL);
    } else {
        return res.status(404).send('Link not found');
    }


}


module.exports = {redirection}