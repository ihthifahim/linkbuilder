const Links = require('../db/models/Links');
const LinkTraffic = require('../db/models/LinkTraffic');

async function deleteLinkHelper(linkKey){

    try{
        await LinkTraffic.destroy({
            where:{linkKey: linkKey}
        });

        const deletedLinks = await Links.destroy({
            where:{link_key: linkKey}
        });

        return `link deleted`;
    }catch(error){
        console.error('Error deleting link:', error);
        throw error;
    }
   
}

module.exports = {deleteLinkHelper};