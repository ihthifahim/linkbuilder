const axios = require('axios');
const cheerio = require('cheerio');
const urlLib = require('url');

const Links = require('../db/models/Links');
const User = require('../db/models/User');
const ErrorLog = require( "../db/models/ErrorLog" );

const {generateLinkKey} = require('../helpers/linkHelpers')

const { jwtDecode } = require('jwt-decode')


async function fetchLink(req, res){
    try {
        const { url } = req.body;
        if(url){
            const response = await axios.get(url);
            const html = response.data;

            if (html.includes('Object not found!')) {
                const errorMessage = 'Page not found';
                console.log(`Page not found: ${errorMessage}`);
                res.status(404).json({ error: errorMessage });
                return;
            }

            const $ = cheerio.load(html);
            const parsedUrl = urlLib.parse(url);
            const domainName = parsedUrl.hostname;

            const metaTags = {
                domainName,
                title: $('title').text(),
                description: $('meta[name="description"]').attr('content') || '',
                image: $('meta[property="og:image"]').attr('content') || '',
            };
            res.json(metaTags);
        }

    } catch (error) {
        if (error.response && error.response.status === 404 || error.code === 'ENOTFOUND') {
            const errorMessage = 'Page not found';
            console.log(error)
            res.status(404).json({ error: errorMessage });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

async function linkKey(req, res){
    const newLinkKey = generateLinkKey();
    res.status(200).json(newLinkKey);
}

async function saveLink(req, res){

    try{
        const {link_key, destinationURL, utm_source, utm_medium, utm_campaign, utm_id, utm_term, utm_content, page_title,
            page_description, page_image, token
        } = req.body;

        const decodedToken = jwtDecode(token, '123');
        const user = await User.findOne({where: { id: decodedToken.userId}});
        if(user){
            await Links.create({
                link_key,
                userId: user.id,
                destinationURL,
                utm_source,
                utm_medium,
                utm_campaign,
                utm_id,
                utm_term,
                utm_content,
                page_title,
                page_description,
                page_image
            });

            res.status(200).json({ message: "link saved"});
        } else {
            res.status(401).json({ message: "something went wrong"});
        }


    } catch (error) {
        await ErrorLog.create({
            errorMessage: error.message,
        });
        res.status(500).json({ error: 'Internal Server Error' });
    }



}




module.exports = {fetchLink, linkKey, saveLink}